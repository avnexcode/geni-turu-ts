import { ParamsWithId } from './../index';
import { type Request, type Response } from 'express';
import { type GetProductsResponse, type GetProductsControllerQueryParams, GetProductResponse } from './index';
import { Product } from './index';

// req: param, res body, req body, query

export type GetProductsController = (
  req: Request<{}, GetProductsResponse, {}, GetProductsControllerQueryParams>,
  res: Response<GetProductsResponse>
) => Promise<void>;

export type GetProductController = (
  req: Request<ParamsWithId, GetProductResponse, {}, {}>,
  res: Response<GetProductResponse>
) => Promise<void>;

export type PostProductController = (
  req: Request<{}, GetProductResponse, Product, {}>,
  res: Response<GetProductResponse>
) => Promise<void>;

export type PutProductController = (
  req: Request<ParamsWithId, GetProductResponse, Omit<Product, 'id' | 'category'>, {}>,
  res: Response<GetProductResponse>
) => Promise<void | Response<GetProductResponse>>;

export type PatchProductController = (
  req: Request<ParamsWithId, GetProductResponse, Omit<Product, 'id' | 'category'>, {}>,
  res: Response<GetProductResponse>
) => Promise<void | Response<GetProductResponse>>;

export type DeleteProductController = (
  req: Request<ParamsWithId, GetProductResponse, {}, {}>,
  res: Response<GetProductResponse>
) => Promise<void>;