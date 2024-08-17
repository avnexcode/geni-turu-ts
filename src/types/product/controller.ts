import { type Request, type Response } from 'express';
import { type ProductResponse, type QueryParams } from './index';

export type GetProductsController = (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response<ProductResponse>
) => Promise<void>;

export type PostProductController = (
  req: Request, 
  res: Response<ProductResponse>
) => Promise<void>;
