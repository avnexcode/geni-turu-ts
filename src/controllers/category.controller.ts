import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategory,
} from '../services/category.service';
import {
  type GetCategoriesController,
  type GetCategoryController,
  type DeleteCategoryController,
  type PatchCategoryController,
  type PostCategoryController,
  type PutCategoryController,
} from '../types';

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
    return res.status(200).send({
      status: 'success',
      message: 'Categories retrieved successfully',
      data: categories,
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const getCategoryController: GetCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategory(id);

    return res.status(200).send({
      status: 'success',
      message: 'Category details retrieved successfully',
      data: category,
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const postCategoryController: PostCategoryController = async (req, res) => {
  try {
    const category = await createCategory(req.body);
    return res.status(201).json({
      status: 'success',
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const putCategoryController: PutCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || description === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Some fields are missing',
      });
    }

    const category = await editCategory(id, req.body);

    return res.status(200).json({
      status: 'success',
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const patchCategoryController: PatchCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await editCategory(id, req.body);
    return res.status(200).json({
      status: 'success',
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const deleteCategoryController: DeleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await deleteCategory(id);
    return res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully',
      data: category,
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return res.status(400).json({
      status: 'Error',
      message: errorMessage,
    });
  }
};
