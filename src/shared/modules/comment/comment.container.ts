import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { CommentService } from './comment-service.interface.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { DefaultCommentService } from './default-comment.service.js';

import { COMPONENT_MAP } from '../../types/index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(COMPONENT_MAP.COMMENT_SERVICE)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(COMPONENT_MAP.COMMENT_MODEL)
    .toConstantValue(CommentModel);

  return commentContainer;
}
