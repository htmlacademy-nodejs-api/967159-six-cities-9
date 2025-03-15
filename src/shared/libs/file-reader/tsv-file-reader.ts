import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, City, RentType, UserType } from '../../types/index.js';


import { DECIMAL, LINEBREAK, TAB, SEPARATOR } from '../../../const.js';
import { isDate } from './utils.js';


export class TSVFileReader extends EventEmitter implements FileReader {
  private readonly CHUNK_SIZE = 16384;

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

      while ((nextLinePosition = remainingData.indexOf(LINEBREAK)) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);

        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }
    this.emit('end', importedRowCount);
  }

  private parseLineToOffer(line: string): Omit<Offer, 'isFavorite'> {
    const [
      title,
      description,
      createdDate,
      city,
      previewImage,
      images,
      isPremium,
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
      city: City[city as 'Paris'| 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
      previewImage,
      images: this.parseToArray(images),
      isPremium: Boolean(isPremium),
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
    return string.split(SEPARATOR).map((name) => name as T);
  }

  private parseToNum (dataString: string): number {
    return Number.parseInt(dataString, DECIMAL);
  }
}
