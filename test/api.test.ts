import request from 'supertest';
import app from '../src/app';

const token = process.env.SECRET_TOKEN;

describe('GET /api/v1', () => {
  it('responds with a JSON message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏',
      }, done);
  });
});

describe('GET /api/v1/emojis', () => {
  it('responds with a JSON message', (done) => {
    request(app)
      .get('/api/v1/emojis')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200, ['😀', '😳', '🙄', '😍', '😂', '😭', '😡', '😎', '🥳', '🤔', '😴', '😱', '😜', '🤯', '😇'], done);
  });
});