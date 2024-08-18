import {
  DeleteCategoryController,
  PatchCategoryController,
  PostCategoryController,
  PutCategoryController,
} from './../types/category/controller';
import { GetCategoriesController, GetCategoryController } from '../types';
import { getAllCategories } from '../services/category.service';

export const getCategoriesController: GetCategoriesController = async (req, res) => {
  try {
    const { page, limit, ...filtersParam } = req.query;
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    const validFilterFields = ['name', 'description'];

    const filter = Object.entries(filtersParam).reduce<Record<string, string>>((acc, [key, value]) => {
      if (validFilterFields.includes(key) && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const categories = await getAllCategories(filter, pageNumber, limitNumber);
    res.status(200).send({
      status: 'Success',
      message: 'Succes retrive all categories',
      data: categories,
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const getCategoryController: GetCategoryController = async (req, res) => {
  try {
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const postCategoryController: PostCategoryController = async (req, res) => {
  try {
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const putCategoryController: PutCategoryController = async (req, res) => {
  try {
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const patchCategoryController: PatchCategoryController = async (req, res) => {
  try {
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const deleteCategoryController: DeleteCategoryController = async (req, res) => {
  try {
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};
