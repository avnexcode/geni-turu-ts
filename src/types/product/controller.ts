import { type Request, type Response } from 'express';
import {
  type Product,
  type ParamsWithId,
  type GetProductsResponse,
  type GetProductsControllerQueryParams,
  type GetProductResponse,
} from './../index';

// req: param, res body, req body, query

export type GetProductsController = (
  req: Request<{}, GetProductsResponse, {}, GetProductsControllerQueryParams>,
  res: Response<GetProductsResponse>
) => Promise<void | Response<GetProductsResponse>>;

export type GetProductController = (
  req: Request<ParamsWithId, GetProductResponse, {}, {}>,
  res: Response<GetProductResponse>
) => Promise<void | Response<GetProductResponse>>;

export type PostProductController = (
  req: Request<{}, GetProductResponse, Product, {}>,
  res: Response<GetProductResponse>
) => Promise<void | Response<GetProductResponse>>;

export type PutProductController = (
  req: Request<ParamsWithId, GetProductResponse, Product, {}>,
  res: Response<GetProductResponse>
) => Promise<void | Response<GetProductResponse>>;

export type PatchProductController = (
  req: Request<ParamsWithId, GetProductResponse, Partial<Product>, {}>,
  res: Response<GetProductResponse>
) => Promise<void | Response<GetProductResponse>>;

export type DeleteProductController = (
  req: Request<ParamsWithId, GetProductResponse, {}, {}>,
  res: Response<GetProductResponse>
) => Promise<void | Response<GetProductResponse>>;
