import { type Request, type Response } from 'express';
import { type GetProductsResponse, type GetProductsControllerQueryParams, GetProductResponse } from './index';

export type GetProductsController = (
  req: Request<{}, {}, {}, GetProductsControllerQueryParams>,
  res: Response<GetProductsResponse>
) => Promise<void>;

export type GetProductController = (
  req: Request, 
  res: Response<GetProductResponse>
) => Promise<void>;

export type PostProductController = (
  req: Request, 
  res: Response<GetProductResponse>
) => Promise<void>;