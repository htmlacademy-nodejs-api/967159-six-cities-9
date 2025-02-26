import dayjs from 'dayjs';

import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { MockServerData, City, RentType, Goods, UserType } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { SEPARATOR, TAB } from '../../../const.js';

const LIMITS = {
  MIN_PRICE: 100,
  MAX_PRICE: 100_000,
  FIRST_WEEK_DAY: 1,
  LAST_WEEK_DAY: 7,
  MIN_RATING: 1,
  MAX_RATING: 5,
  MIN_ROOMS_COUNT: 1,
  MAX_ROOMS_COUNT: 8,
  MIN_SOME_COUNT: 1,
  MAX_SOME_COUNT: 10,
  MIN_LATITUDE: 48,
  MAX_LATITUDE: 54,
  MIN_LONGITUDE: 2,
  MAX_LONGITUDE: 11,
  NUM_AFTER_DIGIT: 1,
  NUM_AFTER_DIGIT_LOCATION: 6,
} as const;


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem(Object.keys(City));
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(SEPARATOR);
    const isPremium = getRandomItem<boolean>([true, false]).toString();
    const isFavorite = getRandomItem<boolean>([true, false]).toString();
    const rating = generateRandomValue(LIMITS.MIN_RATING, LIMITS.MAX_RATING, LIMITS.NUM_AFTER_DIGIT).toString();
    const type = getRandomItem(Object.keys(RentType));
    const bedrooms = generateRandomValue(LIMITS.MIN_ROOMS_COUNT, LIMITS.MAX_ROOMS_COUNT).toString();
    const maxAdults = generateRandomValue(LIMITS.MIN_SOME_COUNT, LIMITS.MAX_SOME_COUNT).toString();
    const price = generateRandomValue(LIMITS.MIN_PRICE, LIMITS.MAX_PRICE).toString();
    const goods = getRandomItems<string>(Object.values(Goods)).join(SEPARATOR);
    const name = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatarUrl = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(Object.keys(UserType));
    const commentsCount = generateRandomValue(LIMITS.MIN_SOME_COUNT, LIMITS.MAX_SOME_COUNT).toString();
    const location = [
      generateRandomValue(LIMITS.MIN_LATITUDE, LIMITS.MAX_LATITUDE, LIMITS.NUM_AFTER_DIGIT_LOCATION).toString(),
      generateRandomValue(LIMITS.MIN_LONGITUDE, LIMITS.MAX_LONGITUDE, LIMITS.NUM_AFTER_DIGIT_LOCATION).toString()
    ].join(SEPARATOR);

    const postDate = dayjs()
      .subtract(generateRandomValue(LIMITS.FIRST_WEEK_DAY, LIMITS.LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, postDate, city,
      previewImage, images, isPremium, isFavorite,
      rating, type, bedrooms, maxAdults, price, goods,
      name, email, avatarUrl, password, userType,
      commentsCount, location,
    ].join(TAB);
  }
}
