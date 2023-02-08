import { Identity, IIdentityProps } from "../../domains/entities/Identity";

export interface IIdentityRepository {
  addIdentity(identity: IIdentityProps): Promise<Identity>;
}

export const IdentityRepository: IIdentityRepository = class {
  constructor() {}

  public static async addIdentity(identity: IIdentityProps) {
    const prismaThing = async () => new Identity(identity);
    return prismaThing();
  }
};
