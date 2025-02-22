import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { CityType } from '../../types/city-type.enum.js';
import { RentType } from '../../types/rent-type.enum.js';
import { UserType } from '../../types/user-type.enum.js';

import { DECIMAL, LINEBREAK, TAB } from '../../../const.js';
import { isDate } from './utils.js';
import { SEMICOLON } from './const.js';


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
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split(LINEBREAK)
      .filter((row) => row.trim().length)
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
    ] = line.split(TAB);

    return {
      title,
      description,
      postDate: isDate(new Date(createdDate)) ? new Date(createdDate) : new Date(),
      city: CityType[city as 'Paris'| 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
      previewImage,
      images: this.parseToArray(images),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rating: this.parseToNum(rating),
      type: RentType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
      bedrooms: this.parseToNum(bedrooms),
      maxAdults: this.parseToNum(maxAdults),
      price: this.parseToNum(price),
      goods: this.parseToArray(goods),
      host: {
        email,
        name: userName,
        avatarUrl,
        password,
        type: UserType[userType as 'Pro' | 'Plain']
      },
      commentsCount: this.parseToNum(commentsCount),
      location: {
        latitude: Number(this.parseToArray(location)[0]),
        longitude: Number(this.parseToArray(location)[1]),
      },
    };
  }

  private parseToArray<T> (string: string): T[] {
    return string.split(SEMICOLON).map((name) => name as T);
  }

  private parseToNum (dataString: string): number {
    return Number.parseInt(dataString, DECIMAL);
  }
}
