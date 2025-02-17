import { User } from './user.type.js';

export type Comment = {
  comment: string;
  date: Date;
  rating: number;
  author: User;
}
