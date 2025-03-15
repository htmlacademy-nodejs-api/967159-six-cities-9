import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';

import { UserEntity, UserModel } from './user.entity.js';
import { UserService } from './user-service.interface.js';
import { DefaultUserService } from './default-user.service.js';

import { COMPONENT_MAP } from '../../types/index.js';

export function createUserContainer () {
  const userContainer = new Container();
  userContainer.bind<UserService>(COMPONENT_MAP.USER_SERVICE).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(COMPONENT_MAP.USER_MODEL).toConstantValue(UserModel);

  return userContainer;
}
