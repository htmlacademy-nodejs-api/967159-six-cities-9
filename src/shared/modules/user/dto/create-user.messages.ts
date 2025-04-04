import { USER_LIMITS } from './const.js';

export const CreateUserMessages = {
  name: {
    invalidFormat: 'Name is required',
    lengthField: `Min length is ${USER_LIMITS.NAME.MIN}, max is ${USER_LIMITS.NAME.MAX}`,
  },
  email: {
    invalidFormat: 'Email must be a valid address'
  },
  avatarPath: {
    invalidFormat: 'AvatarPath is required',
  },
  password: {
    invalidFormat: 'Password is required',
    lengthField: `Min length for password is ${USER_LIMITS.PASSWORD.MIN}, max is ${USER_LIMITS.PASSWORD.MAX}`
  },
  type: {
    invalid: 'Type must be Pro or Обычный'
  },
} as const;
