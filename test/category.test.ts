import request from 'supertest';
import app from '../src/app';

import prisma from '../src/db';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.SECRET_TOKEN;

describe('GET /api/v1/products', () => {
  const mockCategories = [
    {
      id: '1',
      name: 'Makanan',
      description: 'Description 1',
      products: {
        id: '1',
        name: 'Product 1',
        price: 100,
        category_id: 'Category 1',
        description: 'Description 1',
        image: 'image1.jpg',
      },
    },
    {
      id: '2',
      name: 'Minuman',
      description: 'Description 2',
      products: {
        id: '1',
        name: 'Product 1',
        price: 100,
        category_id: 'Category 1',
        description: 'Description 1',
        image: 'image1.jpg',
      },
    },
  ];

  beforeEach(() => {
    jest.spyOn(prisma.category, 'findMany').mockResolvedValue(mockCategories);
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
        mockCategories.map(category =>
          expect.objectContaining({
            id: category.id,
            name: category.name,
            description: category.description,
            products: {
              id: category.products.id,
              name: category.products.name,
              price: category.products.price,
              description: category.products.description,
              image: category.products.image,
            },
          }),
        ),
      ),
    });
  });
});
