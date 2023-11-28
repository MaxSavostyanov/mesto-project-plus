import {
  model, Schema, Model, Document,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import UnauthorizedError from '../errors/unauthorized-error';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url: string) {
        return validator.isURL(url);
      },
      message: 'Некорректный Email',
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator(email: string) {
        return validator.isEmail(email);
      },
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

UserSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email }).select('+password')
    .then((user: IUser) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError());
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError());
          }

          return user;
        });
    });
});

export default model<IUser, UserModel>('user', UserSchema);
