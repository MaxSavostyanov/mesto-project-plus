import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import router from './routes';
import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/not-found-error';
import { requestLogger, errorLogger } from './middlewares/logger';

const { MONGODB_URI, PORT } = require('../config');

const app = express();
app.use(express.json());
mongoose.connect(MONGODB_URI);

app.use(cookieParser());

app.use(requestLogger);
app.use(router);
app.use(() => {
  throw new NotFoundError('Error 404');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту: ${PORT}`);
});
