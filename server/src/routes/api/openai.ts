import express, { RequestHandler } from 'express';
import OpenAI from 'openai';
import { PromptBuilder, parseOpenAIResponse } from '../../utils/PromptBuilder';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// -----------------------------------------
// Route 1: POST /api/question
// Generate a coding question for the game
// -----------------------------------------
const questionHandler: RequestHandler = async (req, res) => {
  const { minion, level, track } = req.body;

  if (!minion || !level || !track) {
    res.status(400).json({ error: 'minion, level, and track are required in the request body.' });
    return;
  }

  const prompt = PromptBuilder.getPrompt(track, level);

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4-turbo',
    });

    const rawContent = chatCompletion.choices[0].message?.content || '';
    let structuredQuestion;

    try {
      structuredQuestion = parseOpenAIResponse(rawContent);
    } catch (err) {
      console.error("❌ Failed to parse OpenAI response:", err);
      const fallback = PromptBuilder.getFallbackQuestion(minion);
      return res.json({ type: 'fallback', question: fallback, fallback: true });
    }

    console.log("✅ Structured Question:", structuredQuestion);

    if (!structuredQuestion.snippet) {
      console.warn("⚠️ Missing code snippet. AI response may not follow expected format.");
    }

    // 🔒 Enforce code snippets for all minions except NullByte
    const requiresSnippet = !['NullByte'].includes(minion);
    const hasCodeBlock = rawContent.includes('```js') || rawContent.includes('```python');

    if (requiresSnippet && !hasCodeBlock) {
      console.warn(`[${new Date().toISOString()}] ⚠️ Fallback Activated - Missing Snippet | Minion: ${minion}, Level: ${level}, Track: ${track}`);
      const fallback = PromptBuilder.getFallbackQuestion(minion);
      return res.json({ type: 'fallback', question: fallback, fallback: true });
    }

    res.json({ type: 'ai', question: structuredQuestion, fallback: false });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ OpenAI API error:`, error);

    try {
      const fallback = PromptBuilder.getFallbackQuestion(minion);
      console.warn(`[${new Date().toISOString()}] ⚠️ Fallback Activated - OpenAI Error | Minion: ${minion}, Level: ${level}, Track: ${track}`);
      res.json({ type: 'fallback', question: fallback, fallback: true });
    } catch (fallbackError) {
      res.status(500).json({ error: 'No fallback questions available for this minion.' });
    }
  }
};

router.post('/question', questionHandler);

// -----------------------------------------
// Route 2: POST /api/tts
// Generate Dr. Dan's voice line for feedback
// -----------------------------------------
const ttsHandler: RequestHandler = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ error: "No text provided for TTS." });
    return;
  }

  try {
    const speechResponse = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'echo',
      input: text,
    });

    const buffer = Buffer.from(await speechResponse.arrayBuffer());
    const timestamp = Date.now();
    const fileName = `dr-dan-${timestamp}.mp3`;
    const filePath = path.join(__dirname, '../../public/audio', fileName);

    fs.writeFileSync(filePath, buffer);

    const audioUrl = `/audio/${fileName}`;
    res.json({ audioUrl });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ TTS Generation Error:`, error);
    res.status(500).json({ error: "Failed to generate Dr. Dan's voice line." });
  }
};

router.post('/tts', ttsHandler);

export default router;
