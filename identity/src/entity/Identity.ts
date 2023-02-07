import { v4 as uuid } from "uuid";
import validator from "validator";

export interface IIdentity {}

export interface IIdentityProps {
  email: string;
  password: string;
}

export class Identity implements IIdentity {
  private email: string;
  private password: string;
  private id: string;

  constructor({ email, password }: IIdentityProps) {
    this.email = email;
    this.password = password;

    this.id = uuid();

    if (!validator.isEmail(email)) throw new Error("invalid email");
    if (!validator.isStrongPassword(password, { minLength: 6 }))
      throw new Error(
        "Password must have at least 6 digits being: 1 lowercase, 1 uppercase, 1 number and 1 symbol"
      );
  }
}
