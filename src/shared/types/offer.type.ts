import { CityType } from './city-type.enum.js';
import { Goods } from './goods.type.js';
import { Location } from './location.type.js';
import { RentType } from './rent-type.type.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityType;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: RentType,
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  host: User;
  commentsCount: number;
  location: Location;
}
