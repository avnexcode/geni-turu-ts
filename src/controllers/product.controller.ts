import { createProduct, deleteProduct, editProduct, getAllProducts, getProduct } from '../services/product.service';
import {
  DeleteProductController,
  GetProductController,
  GetProductsController,
  PatchProductController,
  PostProductController,
  PutProductController,
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

    const data = await getAllProducts(filter, pageNumber, limitNumber);

    res.status(200).json({
      status: 'Success',
      message: 'Success retrieve all products',
      data,
    });
  } catch (error: unknown) {
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

export const getProductController: GetProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved product details',
      data: product,
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

export const postProductController: PostProductController = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved product details',
      data: product,
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

export const putProductController: PutProductController = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const { id } = req.params;
    if (!(name && price && description && image)) {
      res.status(400).json({
        status: 'error',
        message: 'Some fields are missing',
      });
    }

    const product = await editProduct(id, req.body);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Product has been successfully updated',
      data: product,
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

export const patchProductController: PatchProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await editProduct(id, req.body);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Product has been successfully updated',
      data: product,
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

export const deleteProductController: DeleteProductController = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await deleteProduct(id);
    res.status(200).json({
      status: 'success',
      message: 'Product has been successfully deleted',
      data: product,
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
