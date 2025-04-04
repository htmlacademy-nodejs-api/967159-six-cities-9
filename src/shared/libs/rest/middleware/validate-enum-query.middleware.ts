import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';


export class ValidateEnumQueryMiddleware implements Middleware {
  constructor (private queryParam: string, private enumType: object) {}

  public execute (req: Request, _res: Response, next: NextFunction): void {
    const paramValue = req.query[this.queryParam] as string;

    if (!paramValue) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `${this.queryParam} is required`,
        'ValidateEnumQueryMiddleware'
      );
    }

    if (!this.isValidEnumValue(paramValue, this.enumType)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `${paramValue} is not a valid ${this.queryParam}`,
        'ValidateEnumQueryMiddleware'
      );
    }

    next();
  }

  private isValidEnumValue (value: string, enumType: object): boolean {
    return Object.values(enumType).includes(value);
  }
}
