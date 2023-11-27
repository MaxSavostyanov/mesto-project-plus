import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './routes';
import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/not-found-error';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cookieParser());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  req.user = {
    _id: '655e5c481c083c265c69b8d6',
  };

  next();
});

app.use(router);

app.use(() => {
  throw new NotFoundError('Error 404');
});

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущени на порту: ${PORT}`);
});
