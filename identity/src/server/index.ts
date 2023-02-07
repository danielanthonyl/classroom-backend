import express, { Express } from "express";

export class Server {
  private app: Express;
  private PORT: number | string;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 6663;
  }

  init() {
    this.app.listen(this.PORT, () => {
      console.log("working");
    });
  }
}
