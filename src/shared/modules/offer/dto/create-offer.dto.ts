import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  Max,
  MaxLength,
  Min,
  MinLength,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  IsObject
} from 'class-validator';
import { City, Goods, Location, RentType } from '../../../types/index.js';
import { OfferValidationMessage } from './offer.messages.js';
import { OFFER_LIMITS } from './const.js';

export class CreateOfferDto {
  @MinLength(OFFER_LIMITS.TITLE_LENGTH.MIN, { message: OfferValidationMessage.title.minLength })
  @MaxLength(OFFER_LIMITS.TITLE_LENGTH.MAX, { message: OfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(OFFER_LIMITS.DESCRIPTION_LENGTH.MIN, { message: OfferValidationMessage.description.minLength })
  @MaxLength(OFFER_LIMITS.DESCRIPTION_LENGTH.MAX, { message: OfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: OfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: OfferValidationMessage.city.invalid })
  public city: City;

  @MaxLength(OFFER_LIMITS.IMAGE.LENGTH, { message: OfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsArray({message: OfferValidationMessage.images.invalidFormat})
  @ArrayMinSize(OFFER_LIMITS.IMAGES.LENGTH, { message: OfferValidationMessage.images.invalidLength })
  @ArrayMaxSize(OFFER_LIMITS.IMAGES.LENGTH, { message: OfferValidationMessage.images.invalidLength })
  public images: string[];

  @IsBoolean({ message: OfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsInt({ message: OfferValidationMessage.rating.invalidFormat })
  public rating: number;

  @IsEnum(RentType, { message: OfferValidationMessage.rentType.invalid })
  public type: RentType;

  @IsInt({ message: OfferValidationMessage.bedrooms.invalidFormat })
  @Min(OFFER_LIMITS.BEDROOMS.MIN, { message: OfferValidationMessage.bedrooms.minValue })
  @Max(OFFER_LIMITS.BEDROOMS.MAX, { message: OfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsInt({ message: OfferValidationMessage.adults.invalidFormat })
  @Min(OFFER_LIMITS.ADULTS.MIN, { message: OfferValidationMessage.adults.minValue })
  @Max(OFFER_LIMITS.ADULTS.MAX, { message: OfferValidationMessage.adults.maxValue })
  public maxAdults: number;

  @IsInt({ message: OfferValidationMessage.price.invalidFormat })
  @Min(OFFER_LIMITS.PRICE.MIN, { message: OfferValidationMessage.price.minValue })
  @Max(OFFER_LIMITS.PRICE.MAX, { message: OfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: OfferValidationMessage.goods.invalidFormat })
  @ArrayMinSize(OFFER_LIMITS.GOODS.LENGTH, { message: OfferValidationMessage.goods.invalidLength })
  @IsEnum(Goods, { each: true, message: OfferValidationMessage.goods.invalidEnum })
  public goods: Goods[];

  @IsMongoId({ message: OfferValidationMessage.userId.invalidId })
  public userId: string;

  @IsInt({ message: OfferValidationMessage.commentsCount.invalidFormat })
  public commentsCount: number;

  @IsObject({ message: OfferValidationMessage.location.invalidFormat})
  public location: Location;
}
