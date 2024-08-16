import { NextFunction, Request, Response } from 'express';

import ErrorResponse from './interfaces/ErrorResponse';
import { TokenRequest } from './interfaces/TokenRequest';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
  next();
};

export const tokenHandler = (req: TokenRequest, res: Response, next: NextFunction): void => {
  const token = req.query.token;

  if (typeof token !== 'string' || !token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  if (token.trim() !== process.env.SECRET_TOKEN) {
    res.status(400).json({ error: 'Invalid token.' });
    return;
  }

  req.user = { token: token.trim() };
  next();
};