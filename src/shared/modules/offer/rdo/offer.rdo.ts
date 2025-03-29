import { Expose, Transform } from 'class-transformer';
import { City, Goods, Location, RentType } from '../../../types/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  @Transform(({ obj }) => obj.createdAt, { toClassOnly: true })
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
  public isFavorite: boolean = false;

  @Expose()
  public rating: number;

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

  // @Expose()
  // public host: User;
  @Expose()
  public host: string;

  @Expose()
  public commentsCount: number;

  @Expose()
  public location: Location;
}
