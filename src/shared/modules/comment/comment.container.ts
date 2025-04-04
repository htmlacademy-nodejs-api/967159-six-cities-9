import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { CommentService } from './comment-service.interface.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { DefaultCommentService } from './default-comment.service.js';
import CommentController from './comment.controller.js';

import { Controller } from '../../libs/rest/index.js';
import { COMPONENT_MAP } from '../../types/index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(COMPONENT_MAP.COMMENT_SERVICE)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(COMPONENT_MAP.COMMENT_MODEL)
    .toConstantValue(CommentModel);

  commentContainer.bind<Controller>(COMPONENT_MAP.COMMENT_CONTROLLER)
    .to(CommentController).inSingletonScope();

  return commentContainer;
}
