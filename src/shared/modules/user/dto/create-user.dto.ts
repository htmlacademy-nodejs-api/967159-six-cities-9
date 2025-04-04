import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

import { CreateUserMessages } from './create-user.messages.js';
import { UserType } from '../../../types/user-type.enum.js';
import { USER_LIMITS } from './const.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(USER_LIMITS.NAME.MIN, USER_LIMITS.NAME.MAX, { message: CreateUserMessages.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  public avatarUrl: string;

  @IsEnum(UserType, { message: CreateUserMessages.type.invalid })
  public type: UserType;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(USER_LIMITS.PASSWORD.MIN, USER_LIMITS.PASSWORD.MAX, { message: CreateUserMessages.password.lengthField })
  public password: string;

  public favorites?: string[];
}
