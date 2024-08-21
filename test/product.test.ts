import request from 'supertest';
import app from '../src/app';

import prisma from '../src/db';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.SECRET_TOKEN;
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

describe('Products Endpoint', () => {
  describe('GET /api/v1/products', () => {
    beforeEach(() => {
      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(mockProducts);
    });

    it('responds with a paginated JSON message', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Products retrieved successfully',
        data: {
          limit: expect.any(Number),
          page: expect.any(Number),
          total: expect.any(Number),
          products: expect.arrayContaining(
            mockProducts.map(product =>
              expect.objectContaining({
                id: product.id,
                name: product.name,
                price: product.price,
                category_id: product.category_id,
                description: product.description,
                image: product.image,
                category: expect.objectContaining({
                  id: product.category.id,
                  name: product.category.name,
                  description: product.category.description,
                }),
              }),
            ),
          ),
        },
      });
    });
  });

  describe('GET /api/v1/products/:id', () => {
    beforeEach(() => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(mockProducts[0]);
    });

    it('responds with the correct product by ID', async () => {
      const response = await request(app)
        .get('/api/v1/products/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Product details retrieved successfully',
        data: expect.objectContaining({
          id: mockProducts[0].id,
          name: mockProducts[0].name,
          price: mockProducts[0].price,
          category_id: mockProducts[0].category_id,
          description: mockProducts[0].description,
          image: mockProducts[0].image,
          category: {
            id: mockProducts[0].category.id,
            name: mockProducts[0].category.name,
            description: mockProducts[0].category.description,
          },
        }),
      });
    });
  });

  describe('POST /api/v1/products', () => {
  
    beforeEach(() => {
      jest.spyOn(prisma.product, 'create').mockResolvedValue(mockProducts[0]);
    });
  
    it('creates a new product', async () => {
      const response = await request(app)
        .post('/api/v1/products')
        .send(mockProducts[0])
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(201);
  
      expect(response.body).toEqual({
        status: 'success',
        message: 'Product created successfully',
        data: expect.objectContaining({
          id: mockProducts[0].id,
          name: mockProducts[0].name,
          price: mockProducts[0].price,
          category_id: mockProducts[0].category_id,
          description: mockProducts[0].description,
          image: mockProducts[0].image,
          category: expect.objectContaining({
            id: mockProducts[0].category.id,
            name: mockProducts[0].category.name,
            description: mockProducts[0].category.description,
          }),
        }),
      });
    });
  });

  describe('PUT /api/v1/products/:id', () => {
    beforeEach(() => {
      jest.spyOn(prisma.product, 'update').mockResolvedValue(mockProducts[0]);
    });

    it('updates all fields of the product', async () => {
      const response = await request(app)
        .put('/api/v1/products/1')
        .send(mockProducts[0])
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Product updated successfully',
        data: expect.objectContaining({
          id: mockProducts[0].id,
          name: mockProducts[0].name,
          price: mockProducts[0].price,
          description: mockProducts[0].description,
          image: mockProducts[0].image,
          category_id: mockProducts[0].category_id,
          category: expect.objectContaining({
            id: mockProducts[0].category.id,
            name: mockProducts[0].category.name,
            description: mockProducts[0].category.description,
          }),
        }),
      });
    });
  });

  describe('PATCH /api/v1/products/:id', () => {
    const partialUpdate = { name: 'Partially Updated Product' };

    beforeEach(() => {
      jest.spyOn(prisma.product, 'update').mockResolvedValue({
        ...mockProducts[0],
        ...partialUpdate,
      });
    });

    it('updates only one field of the product', async () => {
      const response = await request(app)
        .patch('/api/v1/products/1')
        .send(partialUpdate)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Product updated successfully',
        data: expect.objectContaining({
          id: mockProducts[0].id,
          name: partialUpdate.name,
          price: mockProducts[0].price,
          description: mockProducts[0].description,
          image: mockProducts[0].image,
          category: expect.objectContaining({
            id: mockProducts[0].category.id,
            name: mockProducts[0].category.name,
            description: mockProducts[0].category.description,
          }),
        }),
      });
    });
  });

  describe('DELETE /api/v1/products/:id', () => {
    beforeEach(() => {
      jest.spyOn(prisma.product, 'delete').mockResolvedValue(mockProducts[0]);
    });

    it('deletes the product by ID', async () => {
      const response = await request(app)
        .delete('/api/v1/products/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Product deleted successfully',
        data: expect.objectContaining({
          id: mockProducts[0].id,
          name: mockProducts[0].name,
          price: mockProducts[0].price,
          category_id: mockProducts[0].category_id,
          description: mockProducts[0].description,
          image: mockProducts[0].image,
          category: expect.objectContaining({
            id: mockProducts[0].category.id,
            name: mockProducts[0].category.name,
            description: mockProducts[0].category.description,
          }),
        }),
      });
    });
  });
});
