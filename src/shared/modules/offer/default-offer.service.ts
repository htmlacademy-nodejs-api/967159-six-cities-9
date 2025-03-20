import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { Logger } from '../../libs/logger/index.js';

import { OfferEntity } from './offer.entity.js';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

import { City, COMPONENT_MAP, SortType } from '../../types/index.js';
import { OFFER_COUNT } from './const.js';


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

  // public async find (count?: number): Promise<DocumentType<OfferEntity>[]> {
  //   const limit = count ?? OFFER_COUNT.DEFAULT;

  //   return this.offerModel
  //     .find()
  //     .sort({ createdAt: SortType.Down })
  //     .limit(limit)
  //     .populate(['userId'])
  //     .exec();
  // }

  public async find (count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? OFFER_COUNT.DEFAULT;

    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            let: { offerId: '$_id'},
            pipeline: [
              { $match: { $expr: { $in: ['$$offerId', '$comments'] } } },
              { $project: { _id: 1, rating: 1}}
            ],
            as: 'comments'
          },
        },
        { $addFields:
          { id: { $toString: '$_id'},
            commentsCount: { $size: '$comments'},
            rating: {
              $cond: {
                if: { $gt: [{ $size: '$comments' }, 0] },
                then: {
                  $avg: '$comments.rating'
                },
                else: 0
              }
            }
          }
        },
        { $unset: 'comments' },
        { $limit: limit },
        { $sort: { createdAt: SortType.Down }
        }
      ]).exec();
  }

  public async findPremium (city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city, isPremium: true })
      .sort({ createdAt: SortType.Down })
      .limit(OFFER_COUNT.PREMIUM)
      .populate(['userId'])
      .exec();
  }

  public async findFavorite (): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isFavorite: true })
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
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  // public async incCommentCount (offerId: string): Promise<DocumentType<OfferEntity> | null> {
  //   return this.offerModel
  //     .findByIdAndUpdate(offerId, {'$inc': {
  //       commentCount: 1,
  //     }}).exec();
  // }
}
