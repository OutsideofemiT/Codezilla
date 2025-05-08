

// Picks a random Danism and matching Sound depending on correct/wrong
export function getRandomDanismAndSound(isCorrect: boolean): { text: string, sound: string } {
  const correctDanisms = [
    { text: "🔥 Wow. You actually got that right. Weird.", sound: "/audio/Dan_correct/Dan-correct-1.wav" },
    { text: "🎯 Well look who remembered a concept. Congrats.", sound: "/audio/Dan_correct/Dan-correct-2.wav" },
    { text: "🚀 Miracles *do* happen. Mark the calendar.", sound: "/audio/Dan_correct/Dan-correct-3.wav" },
    { text: "🌟 I guess I *have* to give you a star now", sound: "/audio/Dan_correct/Dan-correctStar.wav" },
  ];

  const incorrectDanisms = [
    { text: "💀 Sure, that's *a* choice. It's just not the right one.", sound: "/audio/Dan_incorrect/Dan-incorrect-1.wav" },
    { text: "😬 Oof. That was bold. Boldly incorrect.", sound: "/audio/Dan_incorrect/Dan-incorrect-2.wav" },
    { text: "🧠 Take a 7-minute break to recover from that disaster.", sound: "/audio/Dan_incorrect/Dan-incorrect-3.wav" },
    { text: "🛑 Fascinating. Bold. Still wrong.", sound: "/audio/Dan_incorrect/Dan-incorrect-4.wav" },
  ];

  const source = isCorrect ? correctDanisms : incorrectDanisms;
  const randomIndex = Math.floor(Math.random() * source.length);
  return source[randomIndex];
}

// Picks a random Special Legendary Danism (only text)
export function getSpecialDanism(): string {
  const specialQuotes = [
    "🌟 Legendary Streak! Even Dr. Dan is impressed... briefly.",
    "🌟 5 correct in a row?! You must be an AI in disguise.",
    "🌟 Victory streak! Maybe you deserve a 7-minute break after all."
    // 👉 Add more special quotes if you want!
  ];
  const randomIndex = Math.floor(Math.random() * specialQuotes.length);
  return specialQuotes[randomIndex];
}
