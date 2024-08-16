import { Request } from 'express';

export default interface TokenRequest extends Request {
  user?: { token: string };
}