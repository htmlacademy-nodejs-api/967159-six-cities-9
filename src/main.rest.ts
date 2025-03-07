import 'reflect-metadata';
import { Container } from 'inversify';

import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { Config, RestConfig } from './shared/libs/config/index.js';
import { RestApplication } from './rest/index.js';
import { COMPONENT_MAP, RestSchema } from './shared/types/index.js';


async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(COMPONENT_MAP.REST_APPLICATION).to(RestApplication).inSingletonScope();
  container.bind<Logger>(COMPONENT_MAP.LOGGER).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(COMPONENT_MAP.CONFIG).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(COMPONENT_MAP.REST_APPLICATION);
  await application.init();
}

bootstrap();
