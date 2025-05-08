import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { OpenAI } from 'openai';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import openaiRoutes from './routes/api/openai';
import { typeDefs, resolvers } from './schemas/index';
import db from './config/connections';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import cors from 'cors';

dotenv.config();

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:3000', // allow your frontend
  credentials: true,
}));

const PORT = process.env.PORT || 3001;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// ✅ Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// ✅ Apollo context: Auth with Bearer Token
const getContext = async ({ req }: { req: Request }) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) return { user: null };

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    return { user };
  } catch (err) {
    console.warn('❌ Invalid JWT');
    return { user: null };
  }
};

const startApolloServer = async () => {
  await server.start();
  await db();

  // ✅ Middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  const clientDistPath = path.join(__dirname, '../../client/dist');
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
    
  } else {
    console.warn('⚠️  Static files not found. Ensure the client has been built.');
  }
  
  // ✅ API routes
  app.use('/api', openaiRoutes);

  // ✅ Apollo middleware
  app.use('/graphql', expressMiddleware(server, { context: getContext }));

  // ✅ Health check
  app.get('/', (_req: Request, res: Response) => {
    res.send('🎙️ Codezilla server is up!');
  });


  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`✅ GraphQL endpoint available at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
