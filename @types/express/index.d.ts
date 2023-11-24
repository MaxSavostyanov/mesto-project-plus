/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';

declare global {

  namespace Express {

    interface Request {
      user: {
        _id: mongoose.Schema.Types.ObjectId | string
      }
    }
  }
}
