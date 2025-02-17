import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { CityType } from '../../types/city-type.enum.js';
import { RentType } from '../../types/rent-type.type.js';
import { Goods } from '../../types/goods.type.js';
import { User } from '../../types/user.type.js';
import { UserType } from '../../types/user-type.enum.js';
import { Location } from '../../types/location.type.js';


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read () {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray (): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }

  private validateRawData (): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      userName,
      email,
      avatarUrl,
      password,
      userType,
      commentsCount,
      location,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city: CityType[city as 'Paris'| 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf' ],
      previewImage,
      images: this.parseImages(images),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rating: this.parseToNum(rating),
      type: type as RentType,
      bedrooms: this.parseToNum(bedrooms),
      maxAdults: this.parseToNum(maxAdults),
      price: this.parseToNum(price),
      goods: this.parseGoods(goods),
      host: this.parseUser(userName, email, avatarUrl, password, UserType[userType as 'Pro' | 'Plain']),
      commentsCount: this.parseToNum(commentsCount),
      location: this.parseLocation(location),
    };
  }

  private parseImages (imagesString: string): string[] {
    return imagesString.split(';').map((name) => (name));
  }

  private parseUser (
    name: string,
    email: string,
    avatarUrl: string,
    password: string,
    type: UserType
  ): User {
    return { email, name, avatarUrl, password, type};
  }

  private parseGoods (goodsString: string): Goods[] {
    return goodsString.split(';').map((name) => name as Goods);
  }


  private parseToNum (dataString: string): number {
    return Number.parseInt(dataString, 10);
  }

  private parseLocation (locationString: string): Location {
    const data = locationString.split(',');

    return {
      latitude: Number(data[0]),
      longitude: Number(data[1])
    };
  }
}
