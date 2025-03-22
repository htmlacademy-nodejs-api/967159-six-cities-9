import { UserType } from '../../../types/index.js';

export class UpdateUserDto {
  public name?: string;
  public avatarUrl?: string;
  public type?: UserType;
  public favorites?: string[];
}

