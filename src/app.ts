import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(middlewares.tokenHandler);

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Welcome to Prot Prot API. Aaaaah Kawai Crot!!!',
    endpoints: {
      emojis: '/api/v1/emojis',
      products: '/api/v1/products',
      categories: '/api/v1/categories',
    },
  });
});

app.use('/api/v1', api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;