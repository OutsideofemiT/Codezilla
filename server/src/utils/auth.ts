import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
  exp?: number; // Optional expiration field
}

export const authMiddleware = ({ req }: { req: any }) => {
  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';

    console.log('Token received:', token); // Log the token

    try {
      const decoded = jwt.decode(token) as JwtPayload | null;

      if (!decoded || !decoded.exp) {
        throw new Error('Token does not contain expiration date');
      }

      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        throw new Error('Token has expired');
      }

      const user = jwt.verify(token, secretKey) as JwtPayload;
      return { user };
    } catch (err) {
      console.error('Invalid token:', err);
      throw new Error('Invalid token');
    }
  }

  return { user: null };
};

export const authenticateToken = async ({ req }: { req: Request }) => {
  const authHeader = req.headers.get('authorization');
  let user = null;
  console.log('AUTH HEADER', authHeader);

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log('TOKEN', token);
    const secretKey = process.env.JWT_SECRET_KEY || '';

    try {
      user = jwt.verify(token, secretKey) as JwtPayload;
      console.log('USER', user);
    } catch (err) {
      console.error(err);
    }
  }

  return { user };
};

export const signToken = (
  username: string, 
  // email: string, 
  _id: unknown
) => {
  const payload = { 
    username, 
    // email, 
    _id 
  };
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  console.log('Generated Token:', token); 
  return token;
};