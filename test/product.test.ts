import request from 'supertest';
import app from '../src/app';

import prisma from '../src/db';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.SECRET_TOKEN;

describe('GET /api/v1/products', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Product 1',
      price: 100,
      category_id: 'Category 1',
      description: 'Description 1',
      image: 'image1.jpg',
      category: {
        id: '2',
        name: 'Minuman',
        description: 'Description 2',
      },
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200,
      category_id: 'Category 2',
      description: 'Description 2',
      image: 'image2.jpg',
      category: {
        id: '2',
        name: 'Minuman',
        description: 'Description 2',
      },
    },
  ];

  beforeEach(() => {
    jest.spyOn(prisma.product, 'findMany').mockResolvedValue(mockProducts);
  });

  it('responds with a JSON message', async () => {
    const response = await request(app)
      .get('/api/v1/products')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      status: 'Success',
      message: 'Success retrieve all products',
      data: expect.arrayContaining(
        mockProducts.map(product =>
          expect.objectContaining({
            id: product.id,
            name: product.name,
            price: product.price,
            category_id: product.category_id,
            description: product.description,
            image: product.image,
            category: {
              id: product.category.id,
              name: product.category.name,
              description: product.category.description,
            },
          }),
        ),
      ),
    });
  });
});
