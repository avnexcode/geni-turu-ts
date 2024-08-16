import { type Request, type Response } from 'express';
import { getAllProducts, getProduct } from '../services/product.service';
import { ProductResponse } from '../types';

export const getProductsController = async (req: Request, res: Response<ProductResponse>): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.status(200).send({
      status: 'Success',
      message: 'Success retrieve all products',
      data: products,
    });
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).send({
      status: 'Error',
      message: errorMessage,
    });
  }
};

export const getProductController = async (req: Request, res: Response<ProductResponse>): Promise<void> => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    res.status(200).send({
      status: 'success',
      message: 'Successfully retrieved product details',
      data: product,
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(400).send({
      status: 'Error',
      message: errorMessage,
    });
  }
};
