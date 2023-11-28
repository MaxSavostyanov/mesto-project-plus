import { celebrate, Joi } from 'celebrate';
import regExp from '../constants/reg-exp';

export const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

export const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExp.url),
    about: Joi.string().min(2).max(200),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regExp.url),
  }),
});

export const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regExp.url),
  }),
});

export const validateID = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});
