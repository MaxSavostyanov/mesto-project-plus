import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

const testUserId = '655e5c481c083c265c69b8d6';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(router);

app.listen(PORT, () => {
  console.log(`Сервер запущени на порту: ${PORT}`);
});
