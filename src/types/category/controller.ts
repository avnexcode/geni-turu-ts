import { type Request, type Response } from 'express';
import { GetCategoriesControllerQueryParams, GetCategoriesResponse } from '../index';

export type GetCategoriesController = (
  req: Request<{}, {}, {}, GetCategoriesControllerQueryParams>,
  res: Response<GetCategoriesResponse>
) => Promise<void>;

export type GetCategoryController = (
  req: Request,
  res: Response  
) => Promise<void>;

export type PostCategoryController = (
  req: Request,
  res: Response
) => Promise<void>;

export type PutCategoryController = (
  req: Request,
  res: Response
) => Promise<void>;

export type PatchCategoryController = (
  req: Request,
  res: Response
) => Promise<void>;

export type DeleteCategoryController = (
  req: Request,
  res: Response
) => Promise<void>;