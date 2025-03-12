import { User } from './user.type.js';

export type UserEntityType = Omit<User, 'password'>;
