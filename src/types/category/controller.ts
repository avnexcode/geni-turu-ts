import { type Request, type Response } from 'express';
import {
  type Category,
  type GetCategoriesControllerQueryParams,
  type GetCategoriesResponse,
  type GetCategoryResponse,
} from '../index';

// req: params, response body, request body, query params

export type GetCategoriesController = (
  req: Request<{}, GetCategoriesResponse, {}, GetCategoriesControllerQueryParams>,
  res: Response<GetCategoriesResponse>
) => Promise<void | Response<GetCategoriesResponse>>;

export type GetCategoryController = (
  req: Request,
  res: Response<GetCategoryResponse>
) => Promise<void | Response<GetCategoryResponse>>;

export type PostCategoryController = (
  req: Request<{}, GetCategoryResponse, Category, {}>,
  res: Response<GetCategoryResponse>
) => Promise<void | Response<GetCategoryResponse>>;

export type PutCategoryController = (
  req: Request,
  res: Response<GetCategoryResponse>
) => Promise<void | Response<GetCategoryResponse>>;

export type PatchCategoryController = (
  req: Request,
  res: Response<GetCategoryResponse>
) => Promise<void | Response<GetCategoryResponse>>;

export type DeleteCategoryController = (
  req: Request,
  res: Response<GetCategoryResponse>
) => Promise<void | Response<GetCategoryResponse>>;
