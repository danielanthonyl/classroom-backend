import { v4 as uuid } from "uuid";
import validator from "validator";

export interface IIdentityProps {
  email: string;
  password: string;
  jwt: string;
  username: string;
}

export interface IIdentity extends IIdentityProps {}

export class Identity implements IIdentity {
  email: string;
  password: string;
  id: string;
  jwt: string;
  username: string;

  constructor({ email, password, jwt, username }: IIdentityProps) {
    this.email = email;
    this.password = password;
    this.jwt = jwt;
    this.username = username;

    this.id = uuid();

    if (!validator.isEmail(email)) throw new Error("invalid email");
    if (!validator.isStrongPassword(password, { minLength: 6 }))
      throw new Error(
        "Password must have at least 6 digits being: 1 lowercase, 1 uppercase, 1 number and 1 symbol"
      );
  }
}
