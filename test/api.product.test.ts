import request from 'supertest';
import app from '../src/app';

import prisma from '../src/db';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.SECRET_TOKEN;

describe('GET /api/v1/products', () => {
  const mockProducts = [
    { id: '1', name: 'Product 1', price: 100, category: 'Category 1', description: 'Description 1', image: 'image1.jpg' },
    { id: '2', name: 'Product 2', price: 200, category: 'Category 2', description: 'Description 2', image: 'image2.jpg' },
  ];

  beforeEach(() => {
    jest.spyOn(prisma.products, 'findMany').mockResolvedValue(mockProducts);
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
            category: product.category,
            description: product.description,
            image: product.image,
          }),
        ),
      ),
    });
  });
});
