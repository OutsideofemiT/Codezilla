import React, { useState } from "react";
import MinionModal from "../MinionModal"; // Adjust path if needed

interface MinionProps {
  id: string;
  name: string;
  image: string;
  xPercent: number;
  yPercent: number;
  questionId: string;
  goToQuestion: (id: string) => void;
  size?: number;
  selectedMinionId?: string | null;
  taunt?: string;
  sound?: string;
  colorClass?: string;
}

const Minion: React.FC<MinionProps> = ({
  id,
  xPercent,
  yPercent,
  image,
  name,
  questionId,
  goToQuestion,
  selectedMinionId,
  taunt,
  sound,
  colorClass,
}) => {
  const [showModal, setShowModal] = useState(false);
  const isSelected = selectedMinionId === id;

  const handleMouseEnter = () => {
    setShowModal(true);
    if (sound) {
      const audio = new Audio(sound);
      audio.play();
    }
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  return (
    <div
      id={`minion-${id}`}
      className={`minion ${isSelected ? "selected" : ""}`}
      style={{
        position: "absolute",
        top: `${yPercent}%`,
        left: `${xPercent}%`,
        width: "120px",
        height: "120px",
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        zIndex: 2,
      }}
      onClick={() => goToQuestion(questionId)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={name}
    >
      <img
        src={image}
        alt={name}
        className="minion-image"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />

<MinionModal
  isOpen={showModal}
  minionName={name}
  minionQuote={taunt || ""}
  colorClass={colorClass}
/>

    </div>
  );
};

export default Minion;
