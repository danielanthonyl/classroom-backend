import { IIdentity } from "../../domains/entities/Identity";
import { DatabaseProvider } from "../../providers/DatabaseProvider";

export interface IFindIdentityProps {
  email?: string;
  phone?: number;
}

export interface IIdentityRepository {
  addIdentity(identity: IIdentity): Promise<IIdentity>;
  findIdentity({ email, phone }: IFindIdentityProps): Promise<IIdentity>;
}

export const IdentityRepository: IIdentityRepository = class {
  constructor() {}

  public static async addIdentity(identity: IIdentity) {
    const { orm } = new DatabaseProvider();

    const {
      jwt: [{ jwt }],
      otp: [{ otp }],
      ...newIdentity
    } = await orm.identity.create({
      data: {
        ...identity,
        jwt: { create: { jwt: identity.jwt } },
        otp: { create: { otp: identity.otp } },
      },
      include: {
        jwt: { where: { jwt: identity.jwt }, select: { jwt: true } },
        otp: { where: { otp: identity.otp }, select: { otp: true } },
      },
    });

    return { jwt, otp, ...newIdentity };
  }

  public static async findIdentity({ email, phone }: IFindIdentityProps) {
    const { orm } = new DatabaseProvider();

    return await orm.identity.findFirst({
      where: { OR: [{ email }, { phone }] },
    });
  }
};
