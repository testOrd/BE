// middleware.ts
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IRequest extends Request {
  userId?: string;
}

export const checkToken = (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access token not found' });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid access token' });
  }
};
