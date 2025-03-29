import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';
import { UserEntity, } from '../user/index.js';
import { City, Goods, RentType, Location } from '../../types/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  // @prop({ required: true })
  // public postDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: City
  })
  public city!: City;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: RentType
  })
  public type!: RentType;

  @prop({ required: true })
  public bedrooms!: number;

  @prop({ required: true })
  public maxAdults!: number;

  @prop({ required: true })
  public price!: number;

  @prop({
    required: true,
    type: () => [String],
    enum: Goods
  })
  public goods!: Goods[];

  @prop({
    ref: () => UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop()
  public commentsCount!: number;

  @prop({ required: true })
  public location!: Location;

  @prop({ default: 0 })
  public totalRating!: number;
}

export const OfferModel = getModelForClass(OfferEntity);
