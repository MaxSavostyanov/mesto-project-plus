import { model, Schema } from 'mongoose';
import validator from 'validator';

interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: [Schema.Types.ObjectId];
  createdAt: Date;
}

const CardSchema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(url: string) {
        return validator.isURL(url);
      },
      message: 'Некорректный Email',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>('card', CardSchema);
