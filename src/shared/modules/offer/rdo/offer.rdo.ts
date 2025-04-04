import { Expose, Transform, Type } from 'class-transformer';
import { City, Goods, Location, RentType } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose({ name: 'createdAt' })
  public postDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  @Transform(({ obj }) => obj.isFavorite ?? false)
  public isFavorite: boolean;

  @Expose()
  public rating: number; //TODO

  @Expose()
  public type: RentType;

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public price: number;

  @Expose()
  public goods: Goods[];

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public host: UserRdo;

  @Expose()
  public commentsCount: number;

  @Expose()
  public location: Location;
}
