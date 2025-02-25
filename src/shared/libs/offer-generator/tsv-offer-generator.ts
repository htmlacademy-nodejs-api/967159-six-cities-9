import dayjs from 'dayjs';

import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { MockServerData, CityType, RentType, Goods, UserType } from '../../types/index.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { SEMICOLON, TAB } from '../../../const.js';


const MIN_PRICE = 100;
const MAX_PRICE = 100_000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;

const MIN_SOME_COUNT = 1;
const MAX_SOME_COUNT = 10;

const MIN_LATITUDE = 48;
const MAX_LATITUDE = 54;

const MIN_LONGITUDE = 2;
const MAX_LONGITUDE = 11;

const NUM_AFTER_DIGIT = 1;
const NUM_AFTER_DIGIT_LOCATION = 6;


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem(Object.keys(CityType));
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(SEMICOLON);
    const isPremium = getRandomItem<boolean>([true, false]).toString();
    const isFavorite = getRandomItem<boolean>([true, false]).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, NUM_AFTER_DIGIT).toString();
    const type = getRandomItem(Object.keys(RentType));
    const bedrooms = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT).toString();
    const maxAdults = generateRandomValue(MIN_SOME_COUNT, MAX_SOME_COUNT).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems<string>(Object.values(Goods)).join(SEMICOLON);
    const name = getRandomItem(this.mockData.users);
    const email = getRandomItem(this.mockData.emails);
    const avatarUrl = getRandomItem(this.mockData.avatars);
    const password = getRandomItem(this.mockData.passwords);
    const userType = getRandomItem(Object.keys(UserType));
    const commentsCount = generateRandomValue(MIN_SOME_COUNT, MAX_SOME_COUNT).toString();
    const location = [
      generateRandomValue(MIN_LATITUDE, MAX_LATITUDE, NUM_AFTER_DIGIT_LOCATION).toString(),
      generateRandomValue(MIN_LONGITUDE, MAX_LONGITUDE, NUM_AFTER_DIGIT_LOCATION).toString()
    ].join(SEMICOLON);

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
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
