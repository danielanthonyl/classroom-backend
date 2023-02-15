import { v4 as uuid } from "uuid";
import validator from "validator";

export interface IIdentityProps {
  email?: string;
  password: string;
  username: string;
  phone?: number;
  photo: string;
  name?: string;
  age?: Date;
  jwt?: string;
  otp?: number;
}

export interface IIdentity extends IIdentityProps {
  uuid: string;
}

export class Identity implements IIdentity {
  email: string;
  name?: string;
  password: string;
  username: string;
  phone: number;
  photo: string;
  age: Date;
  uuid: string;
  jwt: string;
  otp: number;

  constructor(identityProps: IIdentityProps) {
    // this.email = email;
    // this.password = password;
    // this.jwt = jwt;
    // this.username = username;

    Object.assign(this, identityProps);

    this.uuid = uuid();

    if (this.email && !validator.isEmail(this.email)) throw new Error("invalid email");
    if (!validator.isStrongPassword(this.password, { minLength: 6 }))
      throw new Error(
        "Password must have at least 6 digits being: 1 lowercase, 1 uppercase, 1 number and 1 symbol"
      );
  }
}
