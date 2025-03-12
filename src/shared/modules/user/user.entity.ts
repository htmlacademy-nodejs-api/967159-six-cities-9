import { defaultClasses, getModelForClass, prop, modelOptions } from '@typegoose/typegoose';
import { UserEntityType, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

const LENGTH_MAP = {
  NAME: {
    MIN: 1,
    MAX: 15
  },
  // PASSWORD: {
  //   MIN: 6,
  //   MAX: 12
  // }
};


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements UserEntityType {
  @prop({
    required: true,
    minlength: [LENGTH_MAP.NAME.MIN, `Min length for name is ${LENGTH_MAP.NAME.MIN}`],
    maxlength: [LENGTH_MAP.NAME.MAX, `Max length for name is ${LENGTH_MAP.NAME.MAX}`]
  })
  public name: string;

  @prop({
    unique: true,
    required: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect']
  })
  public email: string;

  @prop({
    required: false,
    default: ''
  })
  public avatarUrl: string;

  @prop({
    type: () => String,
    required: true,
    enum: UserType
  })
  public type: UserType;

  @prop({
    required: true,
    // minlength: [LENGTH_MAP.PASSWORD.MIN, `Min length for password is ${LENGTH_MAP.PASSWORD.MIN}`],
    // maxlength: [LENGTH_MAP.PASSWORD.MAX, `Max length for password is ${LENGTH_MAP.PASSWORD.MAX}`]
  })
  private password?: string;

  constructor(userData: UserEntityType) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarUrl = userData.avatarUrl;
    this.type = userData.type;
  }

  public setPassword (password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword () {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
