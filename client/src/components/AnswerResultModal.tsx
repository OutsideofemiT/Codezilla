import { useEffect, useState } from "react";
import SoundPlayer from "./SoundPlayer";
import ReactDOM from "react-dom";

interface AnswerResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isCorrect: boolean;
  audioUrl?: string;
}

const AnswerResultModal = ({
  isOpen,
  onClose,
  isCorrect,
  audioUrl,
}: AnswerResultModalProps) => {
  const [playAudio, setPlayAudio] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPlayAudio(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const drDanImage = isCorrect
    ? "/dan/DrDanCorrect.png"
    : "/dan/DrDanWrong.png";

  const modalContent = (
    <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-[9999] w-[200px] flex flex-col items-center gap-2 animate-fadeIn pointer-events-none">
      <img
        src={drDanImage}
        alt="Dr. Dan"
        className="w-[160px] h-auto object-contain"
      />
      {audioUrl && (
        <SoundPlayer
          src={audioUrl}
          playing={playAudio}
          onEnd={() => {
            setPlayAudio(false);
            onClose();
          }}
        />
      )}
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default AnswerResultModal;
//commiting"