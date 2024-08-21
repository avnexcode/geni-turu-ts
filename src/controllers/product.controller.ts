import { createProduct, deleteProduct, editProduct, getAllProducts, getProduct } from '../services/product.service';
import {
  type DeleteProductController,
  type GetProductController,
  type GetProductsController,
  type PatchProductController,
  type PostProductController,
  type PutProductController,
} from '../types';

export const getProductsController: GetProductsController = async (req, res) => {
  try {
    const { page, limit, ...filtersParam } = req.query;
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    const validFilterFields = ['name', 'category', 'price', 'description'];

    const filter = Object.entries(filtersParam).reduce<Record<string, string>>((acc, [key, value]) => {
      if (validFilterFields.includes(key) && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const products = await getAllProducts(filter, pageNumber, limitNumber);

    return res.status(200).json({
      status: 'success',
      message: 'Products retrieved successfully',
      data: products,
    });
  } catch (error: unknown) {
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

export const getProductController: GetProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);
    return res.status(200).json({
      status: 'success',
      message: 'Product details retrieved successfully',
      data: product,
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

export const postProductController: PostProductController = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    return res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: product,
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

export const putProductController: PutProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, image, category_id: categoryId } = req.body;
    if (!(name && price && description && image) && categoryId === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Some fields are missing',
      });
    }

    const product = await editProduct(id, req.body);

    return res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: product,
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

export const patchProductController: PatchProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await editProduct(id, req.body);

    return res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: product,
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

export const deleteProductController: DeleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await deleteProduct(id);
    return res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
      data: product,
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
