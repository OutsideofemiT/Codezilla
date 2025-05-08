interface MinionModalProps {
  isOpen: boolean;
  minionName: string;
  minionQuote: string;
  colorClass?: string;
}

const MinionModal = ({ isOpen, minionName, minionQuote, colorClass }: MinionModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg text-sm shadow-lg whitespace-nowrap z-50 ${colorClass || "bg-gray-800 text-white"}`}
    >
      <strong>{minionName}</strong>: <em>{minionQuote}</em>
      {/* Optional triangle tail */}
      <div className="absolute left-1/2 translate-x-[-50%] top-full w-2 h-2 rotate-45 bg-inherit z-[-1]"></div>
    </div>
  );
};

export default MinionModal;

