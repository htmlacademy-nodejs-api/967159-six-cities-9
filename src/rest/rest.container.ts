import { Container } from 'inversify';

import { RestApplication } from './rest.application.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database-client/index.js';
import { AppExceptionFilter, ExceptionFilter } from '../shared/libs/rest/index.js';
import { COMPONENT_MAP, RestSchema } from '../shared/types/index.js';

export function createRestApplicationContainer () {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(COMPONENT_MAP.REST_APPLICATION).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(COMPONENT_MAP.LOGGER).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(COMPONENT_MAP.CONFIG).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(COMPONENT_MAP.DATABASE_CLIENT).to(MongoDatabaseClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(COMPONENT_MAP.EXCEPTION_FILTER).to(AppExceptionFilter).inSingletonScope();

  return restApplicationContainer;
}
