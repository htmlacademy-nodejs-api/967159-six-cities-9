import { OFFER_LIMITS } from './const.js';

export const OfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${OFFER_LIMITS.TITLE_LENGTH.MIN}`,
    maxLength: `Maximum title length must be ${OFFER_LIMITS.TITLE_LENGTH.MAX}`,
  },
  description: {
    minLength: `Minimum description length must be ${OFFER_LIMITS.DESCRIPTION_LENGTH.MIN}`,
    maxLength: `Maximum description length must be ${OFFER_LIMITS.DESCRIPTION_LENGTH.MAX}`,
  },
  postDate: {
    invalidFormat: 'PostDate must be a valid ISO date',
  },
  city: {
    invalid: 'City must be Paris, Cologne, Brussels, Amsterdam, Hamburg or Dusseldorf',
  },
  previewImage: {
    maxLength: 'Too long for field «image»',
  },
  images: {
    invalidFormat: 'Field Images must be an array',
    invalidLength: `Images must contain exactly ${OFFER_LIMITS.IMAGES.LENGTH} elements.`
  },
  isPremium: {
    invalidFormat: 'Field IsPremium must be a boolean'
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
  },
  rentType: {
    invalid: 'RentType must be apartment, house, room or hotel'
  },
  bedrooms: {
    invalidFormat: 'Bedrooms count must be an integer',
    minValue: `Minimum bedrooms count is ${OFFER_LIMITS.BEDROOMS.MIN}`,
    maxValue: `Maximum bedrooms count is ${OFFER_LIMITS.BEDROOMS.MAX}`,
  },
  adults: {
    invalidFormat: 'Adults count must be an integer',
    minValue: `Minimum adults count is ${OFFER_LIMITS.ADULTS.MIN}`,
    maxValue: `Maximum adults count is ${OFFER_LIMITS.ADULTS.MAX}`,
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: `Minimum price is ${OFFER_LIMITS.PRICE.MIN}`,
    maxValue: `Maximum price is ${OFFER_LIMITS.PRICE.MAX}`,
  },
  goods: {
    invalidFormat: 'Field Goods must be an array',
    invalidLength: `Goods length must be no less ${OFFER_LIMITS.GOODS.LENGTH}`,
    invalidEnum: 'Goods must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge'
  },
  commentsCount: {
    invalidFormat: 'Comments count must be an integer',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  location: {
    invalidFormat: 'Location should be an object',
  }
} as const;
