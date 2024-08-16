import { Request } from 'express';

export interface TokenRequest extends Request {
  user?: { token: string };
}