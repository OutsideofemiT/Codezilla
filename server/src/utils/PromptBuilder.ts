import { FallbackQuestion, fallbackQuestion } from "../utils/fallbackQuestions";

export class PromptBuilder {
  static getPrompt(track: string, level: string): string {
    switch (level) {
      case "easy":
        return this.nullbytePrompt(track);
      case "medium":
        return this.dbugPrompt(track);
      case "medium-hard":
        return this.typerrorasaurusPrompt(track);
      case "hard":
        return this.pieThonPrompt(track);
      case "boss":
        return this.codezillaPrompt(track);
      default:
        return this.genericPrompt(track, level);
    }
  }

  private static nullbytePrompt(track: string): string {
    return `
You're facing NullByte, a mischievous bug in the system.

Generate an **easy-level** beginner multiple-choice question in **HTML, CSS, or JavaScript**.

Requirements:
- Do **NOT** include a code snippet.
- Focus on **common beginner errors or misunderstandings**.
- Phrase it as a clear, concise question.
- Include four answer choices (A–D) and a correct answer.

Format:
Question: <simple conceptual or mistake-based question>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  private static dbugPrompt(track: string): string {
    const useSnippet = Math.random() < 0.5;
    return useSnippet ? `
You're facing Dbug, a logic trap master.

Generate a **medium-level** JavaScript multiple-choice question that tests logic flow, scope, or control behavior.

Requirements:
- Include a **short** JavaScript code snippet inside triple backticks (≤ 6 lines).
- Then write a question and four labeled answers.
- End with "Correct Answer: X"

Format:
\`\`\`js
<short JS logic trap>
\`\`\`

Question: <what does this code do or output?>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
` : `
You're facing Dbug, a logic trap master.

Generate a **medium-level** multiple-choice question that tests understanding of logic, scope, or conditionals in JavaScript.

Requirements:
- Do **NOT** include a snippet.
- Write a question involving tricky logical outcomes.
- Provide four labeled choices and a correct answer.

Format:
Question: <question involving logic or outcome>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  private static typerrorasaurusPrompt(track: string): string {
    const useSnippet = Math.random() < 0.8;
    return useSnippet ? `
You're facing Typerrorasaurus, master of coercion and confusion.

Generate a **medium-hard** JavaScript question involving **type coercion**, **runtime errors**, or **weird typeof results**.

Requirements:
- Use a **short JavaScript snippet** (≤ 8 lines) that could cause runtime confusion.
- Ask a question based on the outcome.
- Provide 4 labeled choices and the correct answer.

Format:
\`\`\`js
<JS coercion or typeof trap>
\`\`\`

Question: <what is the result or error?>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
` : `
You're facing Typerrorasaurus, master of runtime bugs.

Generate a conceptual **medium-hard** JavaScript question about runtime behavior or type coercion.

Requirements:
- **No code snippet**.
- Focus on common traps like typeof, NaN, null, undefined, equality checks.
- Format with question, 4 answers, and correct letter.

Format:
Question: <runtime or coercion-based question>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  private static pieThonPrompt(track: string): string {
    const useSnippet = Math.random() < 0.5;
    return useSnippet ? `
You're up against PieThon, the async illusionist.

Generate a **hard-level** Python multiple-choice question.

Requirements:
- Use a **Python snippet** (≤ 10 lines).
- Focus on list comprehensions, async, or scope.
- Follow with question, answers, and correct answer.

Format:
\`\`\`python
<complex or quirky Python code>
\`\`\`

Question: <what does this code do?>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
` : `
You're up against PieThon, the async illusionist.

Generate a **hard-level** Python multiple-choice question testing **async**, **loops**, or **comprehension quirks**.

Requirements:
- **Do not** include code.
- Make it a conceptual Python logic question.
- Include 4 answer choices and one correct one.

Format:
Question: <Python async or scope logic>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  private static codezillaPrompt(track: string): string {
    return `
You've reached Codezilla — the final full-stack menace.

Generate a concise **boss-level** full-stack JavaScript multiple-choice question.

Requirements:
- Use a **realistic**, concise code snippet (max 8 lines) involving **2+ technologies** (e.g., React + Express, Node + MongoDB).
- Keep the question under **3 lines**.
- Focus on practical issues: async handling, props/state, or DB operations.
- Provide 4 short answer choices (A–D) and specify the correct answer.

Format:
\`\`\`js
<short full-stack code snippet>
\`\`\`

Question: <concise full-stack logic question>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  private static genericPrompt(track: string, level: string): string {
    return `
You are a coding interview question writer.

Generate a **${level}** multiple-choice question.

Requirements:
- You may optionally use a **short code snippet** in JavaScript.
- Focus on practical coding knowledge.
- Include a question, 4 choices, and correct answer letter.

Format:
\`\`\`js
<if applicable>
\`\`\`

Question: <your question>
A) ...
B) ...
C) ...
D) ...
Correct Answer: <A/B/C/D>
`;
  }

  // ✅ NEW METHOD: Shuffled and formatted fallback question
  static getFallbackQuestion(minionName: string) {
    const pool = fallbackQuestion[minionName] || [];
    const selected = pool[Math.floor(Math.random() * pool.length)];
    const { shuffledChoices, newCorrectIndex } = shuffleChoices(selected.choices, selected.correctIndex);

    return {
      question: selected.question,
      choices: shuffledChoices.map((text, idx) => `${"ABCD"[idx]}) ${text}`),
      answer: "ABCD"[newCorrectIndex],
      snippet: undefined,
      isFallback: true,
    };
  }
}

// Helper for shuffling choices and tracking new correct index
function shuffleChoices(choices: string[], correctIndex: number) {
  const mapped = choices.map((text, index) => ({ text, isCorrect: index === correctIndex }));
  for (let i = mapped.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mapped[i], mapped[j]] = [mapped[j], mapped[i]];
  }
  return {
    shuffledChoices: mapped.map((item) => item.text),
    newCorrectIndex: mapped.findIndex((item) => item.isCorrect),
  };
}

// Exported function for parsing OpenAI responses
export function parseOpenAIResponse(raw: string) {
  const lines = raw.split("\n").map(line => line.trim()).filter(line => line !== "");

  const questionLines: string[] = [];
  let rawChoices: { label: string; text: string }[] = [];
  let answerLetter = "";
  let codeBlock: string | undefined = undefined;
  let recordingQuestion = false;

  const codeRegex = /```(?:js|python)?\n([\s\S]*?)```/i;
  const codeMatch = raw.match(codeRegex);
  if (codeMatch && codeMatch[1].trim().length > 0) {
    codeBlock = codeMatch[1].trim();
  }

  for (const line of lines) {
    if (line.toLowerCase().startsWith("question:")) {
      questionLines.push(line.replace(/^question:\s*/i, "").trim());
      recordingQuestion = true;
    } else if (/^[a-d]\)/i.test(line)) {
      const label = line[0].toUpperCase();
      const text = line.slice(2).trim();
      rawChoices.push({ label, text });
      recordingQuestion = false;
    } else if (line.toLowerCase().startsWith("correct answer")) {
      const match = line.match(/[A-D]/i);
      if (match) {
        answerLetter = match[0].toUpperCase();
      }
    } else if (recordingQuestion) {
      questionLines.push(line);
    }
  }

  const correct = rawChoices.find(c => c.label === answerLetter);
  if (!correct) throw new Error("Correct answer not found");

  const correctText = correct.text;

  const shuffled = rawChoices.map(c => c.text).sort(() => Math.random() - 0.5);
  const labeledChoices = shuffled.map((text, index) => `${"ABCD"[index]}) ${text}`);
  const newCorrectIndex = shuffled.findIndex(t => t === correctText);
  const newCorrectLetter = "ABCD"[newCorrectIndex];

  return {
    snippet: codeBlock,
    question: questionLines.join("\n"),
    choices: labeledChoices,
    answer: newCorrectLetter,
  };
}
