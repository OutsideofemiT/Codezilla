import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnswerResultModal from '../AnswerResultModal';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { preloadSounds } from '../../utils/preloadSounds';

import BackgroundMusic from '../BackgroundMusicProvider';
import { UPDATE_STATS } from '@/graphql/mutations';
import { useMutation } from '@apollo/client';



interface Question {
  snippet?: string;
  question: string;
  choices: string[];
  answer: string;
  isFallback?: boolean;
}

const CollapsibleSnippet: React.FC<{ code: string }> = ({ code }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-4">
      <button
        className="mb-2 text-sm text-yellow-300 underline hover:text-yellow-500 transition"
        onClick={() => setShow(!show)}
      >
        {show ? 'Hide Code' : 'Show Code'}
      </button>
      {show && (
        <div className="overflow-hidden transition-all duration-300 ease-in-out">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              border: '2px solid red',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              maxHeight: '300px',
              overflowY: 'auto',
              paddingRight: '1rem',
              fontSize: '0.75rem',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

const Questions: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [updateQuestionStats] = useMutation(UPDATE_STATS)

  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [userWasCorrect, setUserWasCorrect] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    preloadSounds([
      '/audio/Dan_correct/Dan-correct-1.wav',
      '/audio/Dan_correct/Dan-correct-2.wav',
      '/audio/Dan_correct/Dan-correct-3.wav',
      '/audio/Dan_correct/Dan-correct-4.wav',
      '/audio/Dan_incorrect/Dan-incorrect-1.wav',
      '/audio/Dan_incorrect/Dan-incorrect-2.wav',
      '/audio/Dan_incorrect/Dan-incorrect-3.wav',
      '/audio/Dan_incorrect/Dan-incorrect-4.wav',
      '/audio/Dan_incorrect/Dan-incorrect-5.wav',
    ]);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(delay);
  }, []);

  const minionMap: Record<string, string> = {
    q1: 'NullByte',
    q2: 'Dbug',
    q3: 'Typerrorasaurus',
    q4: 'PieThon',
    q5: 'Codezilla',
  };

  const difficultyMap: Record<string, string> = {
    NullByte: 'easy',
    Dbug: 'medium',
    Typerrorasaurus: 'medium-hard',
    PieThon: 'hard',
    Codezilla: 'boss',
  };

  useEffect(() => {
    if (!id) return;
    let didCancel = false;

    const fetchQuestion = async () => {
      const minion = minionMap[id] || 'NullByte';
      const level = difficultyMap[minion] || 'easy';
      const track = minion === 'PieThon' ? 'Python' : 'JavaScript';

      try {
        const res = await fetch('/api/question', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ minion, level, track }),
        });

        const data = await res.json();
        if (didCancel || !data.question) return;

        const raw = data.question;
        setQuestion({
          snippet: raw.snippet,
          question: raw.question,
          choices: raw.choices,
          answer: raw.answer,
          isFallback: data.fallback || false,
        });
      } catch (err) {
        console.error('❌ Error:', err);
      }
    };

    fetchQuestion();
    return () => {
      didCancel = true;
    };
  }, [id]);

  useEffect(() => {
    if (question?.isFallback) {
      console.warn('⚠️ Fallback question triggered (not shown to user)');
    }
  }, [question]);

  const getRandomAudio = (isCorrect: boolean): string => {
    const correctClips = [
      '/audio/Dan_correct/Dan-correct-1.wav',
      '/audio/Dan_correct/Dan-correct-2.wav',
      '/audio/Dan_correct/Dan-correct-3.wav',
      '/audio/Dan_correct/Dan-correct-4.wav',
    ];
    const incorrectClips = [
      '/audio/Dan_incorrect/Dan-incorrect-1.wav',
      '/audio/Dan_incorrect/Dan-incorrect-2.wav',
      '/audio/Dan_incorrect/Dan-incorrect-3.wav',
      '/audio/Dan_incorrect/Dan-incorrect-4.wav',
      '/audio/Dan_incorrect/Dan-incorrect-5.wav',
    ];
    const pool = isCorrect ? correctClips : incorrectClips;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!question || !selectedAnswer) return;

    const correctIndex = question.answer.charCodeAt(0) - 65;
    const correctChoice = question.choices[correctIndex]?.slice(3).trim();
    const isCorrect = selectedAnswer === correctChoice;

    setUserWasCorrect(isCorrect);
    setAudioUrl(getRandomAudio(isCorrect));
    setShowResult(true);

    const questionNumber = Number(id?.replace('q', ''));

    try {
      await updateQuestionStats({
        variables: {
          isCorrect
        },
      });
    }
    catch (error) {
      console.error('Error updating question stats:', error);
    }
    setTimeout(() => {
      if (questionNumber === 5) {
        navigate(isCorrect ? '/victory' : '/gameover');
      }
    }, 6000);
  };

  const handleBack = () => navigate('/map');

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: 'url("/background/codezilla_bkgd.png")' }}
    >
      <BackgroundMusic src="/black.sabbath.mp3" volume={0.03} />

      <div className="relative question-screen max-h-screen overflow-y-auto p-6 max-w-xl mx-auto text-left pb-40">
        <h1 className="text-xl font-semibold mb-4 text-white">
          Question {id?.replace('q', '') || ''}
        </h1>

        {!question ? (
          <p className="text-white">Loading question...</p>
        ) : (
          <>
            {question.snippet?.trim() &&
              (id === 'q5' ? (
                <CollapsibleSnippet code={question.snippet} />
              ) : (
                <SyntaxHighlighter
                  language="javascript"
                  style={vscDarkPlus}
                  showLineNumbers
                  customStyle={{
                    border: '2px solid red',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                    maxHeight: '220px',
                    overflowY: 'auto',
                    paddingRight: '1rem',
                    fontSize: '0.75rem',
                  }}
                >
                  {question.snippet}
                </SyntaxHighlighter>
              ))}

            <div className="mb-4 text-white text-base text-left whitespace-pre-wrap">
  <ReactMarkdown
  components={{
    p({ node, children, ...props }) {
      return <div className="mb-2" {...props}>{children}</div>;
    },
    code({ inline, children, ...props }: { inline?: boolean; children?: React.ReactNode }) {
      return inline ? (
        <code className="inline-code" {...props}>
          {children}
        </code>
      ) : (
        <pre className="bg-gray-800 p-4 rounded-md text-sm font-mono shadow-lg overflow-x-auto">
          <code {...props}>{children}</code>
        </pre>
      );
    },
  }}
>
  {question.question}
</ReactMarkdown>

            </div>

            <div className="text-left flex flex-col items-start gap-2 text-white">
              {question.choices.map((choice, index) => {
                const value = choice.slice(3).trim();
                return (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value={value}
                      checked={selectedAnswer === value}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                    />
                    <span>{choice}</span>
                  </label>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-10 w-full flex justify-between items-center gap-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer || !isReady}
            className={`px-4 py-2 border-2 rounded font-semibold transition duration-200 ${
              selectedAnswer && isReady
                ? 'text-white border-white hover:text-black hover:bg-yellow-400'
                : 'text-white border-white opacity-50 cursor-not-allowed bg-transparent'
            }`}
          >
            Submit Answer
          </button>

          <button
            onClick={handleBack}
            className="px-4 py-2 border-2 rounded font-semibold text-white border-white bg-transparent hover:text-black hover:bg-red-600 transition duration-200"
          >
            Back to Map
          </button>
        </div>

        <AnswerResultModal
          isOpen={showResult}
          onClose={() => setShowResult(false)}
          isCorrect={userWasCorrect}
          audioUrl={audioUrl}
        />
      </div>
    </div>
  );
};

export default Questions;
