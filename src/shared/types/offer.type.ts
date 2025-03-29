import { City } from './city.enum.js';
import { Goods } from './goods.enum.js';
import { Location } from './location.type.js';
import { RentType } from './rent-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: RentType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  host: User;
  commentsCount: number;
  location: Location;
}
