import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';

import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { Logger } from '../../libs/logger/index.js';

import { COMPONENT_MAP, SortType } from '../../types/index.js';
import { COMMENT_COUNT } from './const.js';
import { OfferService } from '../offer/offer-service.interface.js';


@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(COMPONENT_MAP.COMMENT_MODEL) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(COMPONENT_MAP.OFFER_SERVICE) private readonly offerService: OfferService,
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
  ) {}

  public async create (dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${comment._id}`);

    await this.offerService.incCommentCountAndUpdateRating(dto.offerId, dto.rating);

    return comment.populate('userId');
  }

  public async findByOfferId (offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortType.Down })
      .limit(COMMENT_COUNT)
      .populate('userId');
  }

  public async exists (offerId: string): Promise<boolean> {
    return await this.offerService.exists(offerId);
  }
}

