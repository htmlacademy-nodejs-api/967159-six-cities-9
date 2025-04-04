import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';

import { OfferEntity } from './offer.entity.js';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

import { City, COMPONENT_MAP, SortType } from '../../types/index.js';
import { OFFER_COUNT } from './const.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';


@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.OFFER_MODEL) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create (dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById (offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find (count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ? Math.min(count, OFFER_COUNT.MAX) : OFFER_COUNT.DEFAULT;

    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(limit)
      .populate(['userId'])
      .exec();
  }

  public async findPremium (city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city, isPremium: true })
      .sort({ createdAt: SortType.Down })
      .limit(OFFER_COUNT.PREMIUM)
      .populate(['userId'])
      .exec();
  }

  public async deleteById (offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById (offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async exists (documentId: string): Promise<boolean> {
    return this.offerModel
      .exists({_id: documentId})
      .then((r) => !!r);
  }

  public async incCommentCountAndUpdateRating (offerId: string, newRating: number): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel.findById(offerId);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${offerId} not found.`, 'OfferService');
    }

    const totalRating = offer.totalRating + newRating;
    const commentsCount = offer.commentsCount + 1;
    const newCalculatedRating = totalRating / commentsCount;

    return this.offerModel.findByIdAndUpdate(
      offerId,
      {
        $inc: {
          commentsCount: 1,
          totalRating: newRating,
        },
        $set: {
          rating: newCalculatedRating,
        },
      },
      { new: true }
    ).exec();
  }
}
