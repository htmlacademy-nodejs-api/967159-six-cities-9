import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';
import { UserEntity, } from '../user/index.js';
import { City, Goods, RentType, Location } from '../../types/index.js';

const BOUNDS = {
  IMAGES: {
    LENGTH: 6
  },
  RATING: {
    MIN: 1,
    MAX: 5,
  },
  BEDROOMS: {
    MIN: 1,
    MAX: 8
  },
  ADULTS: {
    MIN: 1,
    MAX: 10
  },
  PRICE: {
    MIN: 100,
    MAX: 100_000
  },
  GOODS: {
    LENGTS: 1
  }
};

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

  @prop({ required: true })
  public postDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: City
  })
  public city!: City;

  @prop({ required: true })
  public previewImage!: string;

  @prop({
    required: true,
    validate: {
      validator: (value: string[]) => value.length === BOUNDS.IMAGES.LENGTH,
      message: `The images array must have exactly ${BOUNDS.IMAGES.LENGTH} elements.`
    }
  })
  public images!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({
    required: true,
    min: BOUNDS.RATING.MIN,
    max: BOUNDS.RATING.MAX
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: RentType
  })
  public type!: RentType;

  @prop({
    required: true,
    min: BOUNDS.BEDROOMS.MIN,
    max: BOUNDS.BEDROOMS.MAX
  })
  public bedrooms!: number;

  @prop({
    required: true,
    min: BOUNDS.ADULTS.MIN,
    max: BOUNDS.ADULTS.MAX
  })
  public maxAdults!: number;

  @prop({
    required: true,
    min: BOUNDS.PRICE.MIN,
    max: BOUNDS.PRICE.MAX
  })
  public price!: number;

  @prop({
    required: true,
    type: () => [String],
    enum: Goods,
    validate: {
      validator: (value: string[]) => value.length,
      message: `The goods array must have at least ${BOUNDS.GOODS.LENGTS} element.`
    }
  })
  public goods!: Goods[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop()
  public commentsCount!: number;

  @prop({ required: true })
  public location!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
