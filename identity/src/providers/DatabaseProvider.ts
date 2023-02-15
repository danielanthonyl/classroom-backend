import { Prisma, PrismaClient } from "@prisma/client";

export interface IDatabaseProvider {
  orm: PrismaClient;
}

export class DatabaseProvider implements IDatabaseProvider {
  orm: PrismaClient;

  constructor() {
    this.orm = new PrismaClient();
  }
}
