import { v4 as uuid } from "uuid";
import validator from "validator";

export interface IIdentityProps {
  photo: string;
  password: string;
  username: string;
  email?: string;
  phone?: number;
  name?: string;
  age?: Date;
  jwt?: string;
  otp?: number;
}

export interface IIdentity extends IIdentityProps {
  uuid: string;
}

export class Identity implements IIdentity {
  uuid: string;
  photo: string;
  password: string;
  username: string;
  email?: string;
  phone?: number;
  name?: string;
  age?: Date;
  jwt?: string;
  otp?: number;

  constructor(identityProps: IIdentityProps) {
    Object.assign(this, identityProps);

    this.uuid = uuid();

    if (this.email && !validator.isEmail(this.email)) throw new Error("invalid email");
    if (!validator.isStrongPassword(this.password, { minLength: 6 }))
      throw new Error(
        "Password must have at least 6 digits being: 1 lowercase, 1 uppercase, 1 number and 1 symbol"
      );
  }
}
