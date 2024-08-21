import request from 'supertest';

import app from '../src/app';

const token = process.env.SECRET_TOKEN;

describe('app', () => {
  it('responds with a not found message', (done) => {
    request(app)
      .get('/what-is-this-even')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Welcome to Prot Prot API. Aaaaah Kawai Crot!!!',
        endpoints: {
          emojis: '/api/v1/emojis',
          products: '/api/v1/products',
          categories: '/api/v1/categories',
        },
      }, done);
  });
});
