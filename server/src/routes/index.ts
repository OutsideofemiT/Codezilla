import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import openaiRoutes from './api/openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mount the OpenAI routes under /api
app.use('/api', openaiRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
