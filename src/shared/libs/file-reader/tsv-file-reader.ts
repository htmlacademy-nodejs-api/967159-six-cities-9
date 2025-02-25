import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, CityType, RentType, UserType } from '../../types/index.js';


import { DECIMAL, LINEBREAK, TAB, SEMICOLON, ZERO } from '../../../const.js';
import { isDate } from './utils.js';


const ONE = 1;


export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  public async read (): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf(LINEBREAK)) >= ZERO) {
        const completeRow = remainingData.slice(ZERO, nextLinePosition + ONE);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }
    this.emit('end', importedRowCount);
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
