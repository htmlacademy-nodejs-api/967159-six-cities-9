import { MaxLength, MinLength, IsMongoId, IsInt, Min, Max } from 'class-validator';
import { RATING_COUNT, TEXT_LENGTH } from './const.js';
import { CreateCommentValidationMessage } from './create-comment.messages.js';

export class CreateCommentDto {
  @MinLength(TEXT_LENGTH.MIN, { message: CreateCommentValidationMessage.text.minLength })
  @MaxLength(TEXT_LENGTH.MAX, { message: CreateCommentValidationMessage.text.maxLength })
  public text: string;

  @IsMongoId({ message: CreateCommentValidationMessage.offerId.invalidId })
  public offerId: string;

  @IsMongoId({ message: CreateCommentValidationMessage.userId.invalidId })
  public userId: string;


  @IsInt({ message: CreateCommentValidationMessage.rating.invalidFormat })
  @Min(RATING_COUNT.MIN, { message: CreateCommentValidationMessage.rating.minValue })
  @Max(RATING_COUNT.MAX, { message: CreateCommentValidationMessage.rating.maxValue })
  public rating: number;
}
