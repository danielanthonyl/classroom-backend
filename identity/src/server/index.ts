import express, { Express, json } from "express";
import { identityRouter } from "../infrastructures/IdentityRouter";

export class Server {
  private app: Express;
  private PORT: number | string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 6663;
    this.app.use(json());

    this.app.use(identityRouter);
  }

  init() {
    this.app.listen(this.PORT, () => {
      console.log(`working \n port: ${this.PORT}`);
    });
  }
}
