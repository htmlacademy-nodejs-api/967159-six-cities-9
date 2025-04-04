import { inject, injectable } from 'inversify';
import express, { Express } from 'express';

import { Logger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { Controller, ExceptionFilter } from '../shared/libs/rest/index.js';
import { COMPONENT_MAP, RestSchema } from '../shared/types/index.js';

import { getMongoURI } from '../shared/helpers/index.js';


@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(COMPONENT_MAP.LOGGER) private readonly logger: Logger,
    @inject(COMPONENT_MAP.CONFIG) private readonly config: Config<RestSchema>,
    @inject(COMPONENT_MAP.DATABASE_CLIENT) private readonly databaseClient: DatabaseClient,
    @inject(COMPONENT_MAP.EXCEPTION_FILTER) private readonly appExceptionFilter: ExceptionFilter,
    @inject(COMPONENT_MAP.USER_CONTROLLER) private readonly userController: Controller,
    @inject(COMPONENT_MAP.OFFER_CONTROLLER) private readonly offerController: Controller,
    @inject(COMPONENT_MAP.COMMENT_CONTROLLER) private readonly commentController: Controller,
  ) {
    this.server = express();
  }

  public async init () {
    this.logger.info('Application initialization');
    this.logger.info('Init database…');
    await this.initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server…');
    await this.initServer();
    this.logger.info(
      `🚀 Server started on http://${this.config.get('HOST')}:${this.config.get('PORT')}`
    );
  }

  private async initDb () {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer () {
    const port = this.config.get('PORT');
    const host = this.config.get('HOST');
    this.server.listen(port, host);
  }

  private async initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/comments', this.commentController.router);
  }

  private async initMiddleware() {
    this.server.use(express.json());
  }

  private async initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }
}
