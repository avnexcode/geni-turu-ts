import request from 'supertest';
import app from '../src/app';
import prisma from '../src/db';
import dotenv from 'dotenv';

dotenv.config();
const token = process.env.SECRET_TOKEN;

const mockCategories = [
  {
    id: '1',
    name: 'Makanan',
    description: 'Description 1',
    products: [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        category_id: 'Category 1',
        description: 'Description 1',
        image: 'image1.jpg',
      },
    ],
  },
  {
    id: '2',
    name: 'Minuman',
    description: 'Description 2',
    products: [
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        category_id: 'Category 2',
        description: 'Description 2',
        image: 'image2.jpg',
      },
    ],
  },
];

describe('Categories Endpoint', () => {
  describe('GET /api/v1/categories', () => {
    beforeEach(() => {
      jest.spyOn(prisma.category, 'findMany').mockResolvedValue(mockCategories);
    });

    it('responds with a JSON message', async () => {
      const response = await request(app)
        .get('/api/v1/categories')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Categories retrieved successfully',
        data: {
          limit: expect.any(Number),
          page: expect.any(Number),
          total: expect.any(Number),
          categories: expect.arrayContaining(
            mockCategories.map(category =>
              expect.objectContaining({
                id: category.id,
                name: category.name,
                description: category.description,
                products: expect.arrayContaining(
                  category.products.map(product =>
                    expect.objectContaining({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      description: product.description,
                      image: product.image,
                    }),
                  ),
                ),
              }),
            ),
          ),
        },
      });
    });
  });

  describe('GET /api/v1/categories/:id', () => {
    beforeEach(() => {
      jest.spyOn(prisma.category, 'findUnique').mockResolvedValue(mockCategories[0]);
    });

    it('responds with the correct category by ID', async () => {
      const response = await request(app)
        .get('/api/v1/categories/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Category details retrieved successfully',
        data: expect.objectContaining({
          id: mockCategories[0].id,
          name: mockCategories[0].name,
          description: mockCategories[0].description,
          products: expect.arrayContaining(
            mockCategories[0].products.map(product =>
              expect.objectContaining({
                id: product.id,
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
              }),
            ),
          ),
        }),
      });
    });
  });

  describe('POST /api/v1/categories', () => {
    beforeEach(() => {
      jest.spyOn(prisma.category, 'create').mockResolvedValue(mockCategories[0]);
    });
  
    it('creates a new category', async () => {
      const response = await request(app)
        .post('/api/v1/categories')
        .send(mockCategories[0])
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(201);
  
      expect(response.body).toEqual({
        status: 'success',
        message: 'Category created successfully',
        data: expect.objectContaining({
          id: mockCategories[0].id,
          name: mockCategories[0].name,
          description: mockCategories[0].description,
        }),
      });
    });
  });

  describe('PUT /api/v1/categories/:id', () => {
    const updatedCategory = {
      ...mockCategories[0],
      name: 'Updated Category',
      description: 'Updated Description',
    };

    beforeEach(() => {
      jest.spyOn(prisma.category, 'update').mockResolvedValue(updatedCategory);
    });

    it('updates all fields of the category', async () => {
      const response = await request(app)
        .put('/api/v1/categories/1')
        .send(updatedCategory)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Category updated successfully',
        data: expect.objectContaining({
          id: updatedCategory.id,
          name: updatedCategory.name,
          description: updatedCategory.description,
        }),
      });
    });
  });

  describe('PATCH /api/v1/categories/:id', () => {
    const partialUpdate = { name: 'Partially Updated Category' };

    beforeEach(() => {
      jest.spyOn(prisma.category, 'update').mockResolvedValue({
        ...mockCategories[0],
        ...partialUpdate,
      });
    });

    it('updates only one field of the category', async () => {
      const response = await request(app)
        .patch('/api/v1/categories/1')
        .send(partialUpdate)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Category updated successfully',
        data: expect.objectContaining({
          id: mockCategories[0].id,
          name: partialUpdate.name,
          description: mockCategories[0].description,
        }),
      });
    });
  });

  describe('DELETE /api/v1/categories/:id', () => {
    beforeEach(() => {
      jest.spyOn(prisma.category, 'delete').mockResolvedValue(mockCategories[0]);
    });

    it('deletes the category by ID', async () => {
      const response = await request(app)
        .delete('/api/v1/categories/1')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        status: 'success',
        message: 'Category deleted successfully',
        data: expect.objectContaining({
          id: mockCategories[0].id,
          name: mockCategories[0].name,
          description: mockCategories[0].description,
        }),
      });
    });
  });
});
