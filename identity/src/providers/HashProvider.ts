import bcrypt from "bcrypt";

export interface IHashProvider {
  hash(text: string): Promise<string>;
  verify(text: string, hash: string): Promise<boolean>;
}

export class HashProvider implements IHashProvider {
  async hash(text: string): Promise<string> {
    return await bcrypt.hash(text, 10);
  }

  async verify(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
