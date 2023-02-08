import jwt, { JwtPayload } from "jsonwebtoken";

export interface IJWTGeneratePayload {
  email: string;
}

export interface IJWTProvider {
  generate(payload: IJWTGeneratePayload): string;
  verify(token: string): string | JwtPayload;
}

export class JWTProvider implements IJWTProvider {
  private secretKey: string;
  constructor() {
    this.secretKey = "classroom-jwt-key";
  }

  generate(payload: IJWTGeneratePayload) {
    return jwt.sign(payload, this.secretKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.secretKey, {});
  }
}
