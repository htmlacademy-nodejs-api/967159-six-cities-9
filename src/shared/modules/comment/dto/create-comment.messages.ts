import { RATING_COUNT, TEXT_LENGTH } from './const.js';

export const CreateCommentValidationMessage = {
  text: {
    minLength: `Minimum text length must be ${TEXT_LENGTH.MIN}`,
    maxLength: `Maximum text length must be ${TEXT_LENGTH.MAX}`,
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  offerId: {
    invalidId: 'offerId field must be a valid id',
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: `Minimum rating is ${RATING_COUNT.MIN}`,
    maxValue: `Maximum rating is ${RATING_COUNT.MAX}`,
  },
};
