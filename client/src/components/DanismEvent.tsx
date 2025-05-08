import { useState, useEffect } from "react"; 
import SoundPlayer from "@/components/SoundPlayer"; 
import { preloadSounds } from "../utils/preloadSounds"; 
import { getRandomDanismAndSound } from "../utils/handleAnswer";


const DanismEvent = () => {
  const [showModal, setShowModal] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [fallbackAudio, setFallbackAudio] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [dialogText, setDialogText] = useState("");

  // 🔥 Preload all audio files once
  useEffect(() => {
    preloadSounds([
      '/audio/Dan_correct/Dan-correct-1.wav',
      '/audio/Dan_correct/Dan-correct-2.wav',
      '/audio/Dan_correct/Dan-correct-3.wav',
      '/audio/Dan_correct/Dan-correct-4.wav',
      '/audio/Dan_correct/Dan-5inarow.wav',
      '/audio/Dan_incorrect/Dan-incorrect-1.wav',
      '/audio/Dan_incorrect/Dan-incorrect-2.wav',
      '/audio/Dan_incorrect/Dan-incorrect-3.wav',
      '/audio/Dan_incorrect/Dan-incorrect-4.wav',
      '/audio/Dan_incorrect/Dan-incorrect-5.wav'
    ]);
  }, []);

  // 🔥 Fetch TTS voice from your API when modal opens
  useEffect(() => {
    if (showModal && dialogText) {
      const fetchVoice = async () => {
        try {
          const res = await fetch("/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: dialogText,
              character: "Dr. Dan", // Character name if your backend needs it
            }),
          });

          if (!res.ok) throw new Error("TTS API failed");

          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          setAudioSrc(url); // TTS Audio ready
          setPlaying(true);
        } catch (err) {
          console.error("TTS Error:", err);
          // fallback to local mp3 if TTS fails
          setFallbackAudio("/audio/drdan_fallback.mp3");
          setPlaying(true);
        }
      };

      fetchVoice();
    }
  }, [showModal, dialogText]);

  // 🔥 Handle when player answers something
  const triggerDanism = (isCorrect: boolean) => {
    const { text, sound } = getRandomDanismAndSound(isCorrect);
    setDialogText(text);        
    setAudioSrc(sound);           
    setFallbackAudio(null);       
    setShowModal(true);           
    setPlaying(true);             
  };
  

  return (
    <>
      {/* TEMP TEST BUTTONS */}
      <div className="flex gap-4 justify-center my-4">
        <button
          onClick={() => triggerDanism(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow"
        >
          Test Correct Answer
        </button>
        <button
          onClick={() => triggerDanism(false)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow"
        >
          Test Wrong Answer
        </button>
      </div>

      

      {/* 🎶 SoundPlayer */}
      {audioSrc && (
        <SoundPlayer
          src={audioSrc}
          playing={playing}
          onEnd={() => setPlaying(false)}
        />
      )}
      {fallbackAudio && !audioSrc && (
        <SoundPlayer
          src={fallbackAudio}
          playing={playing}
          onEnd={() => setPlaying(false)}
        />
      )}
    </>
  );
};

export default DanismEvent;
