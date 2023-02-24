import { IIdentityRepository } from "../../../dataAccess/IdentityRepository/IdentityRepository";
import { IHashProvider } from "../../../providers/HashProvider";
import { IJWTProvider } from "../../../providers/JWTProvider";
import { IAddIdentityDTO } from "../../DTOs/identityDTOs/AddIdentityDTO";
import { Identity, IIdentity } from "../../entities/Identity";

export interface IAddIdentityUseCase {
  execute(data: IAddIdentityDTO): Promise<IIdentity>;
}

export class AddIdentityUseCase implements IAddIdentityUseCase {
  constructor(
    private identityRepository: IIdentityRepository,
    private jwtProvider: IJWTProvider,
    private hashProvider: IHashProvider
  ) {}

  async execute(data: IAddIdentityDTO): Promise<IIdentity> {
    const foundIdentity = await this.identityRepository.findIdentity({
      email: data.email,
      phone: data.phone,
    });

    if (foundIdentity) throw new Error("Identity already registered.");

    const jwt = this.jwtProvider.generate({
      data: data.email || data.phone!,
    });

    const identity = new Identity({ ...data, jwt });
    const password = await this.hashProvider.hash(identity.password);

    return await this.identityRepository.addIdentity({ ...identity, password });
  }
}
