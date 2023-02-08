import { IIdentityRepository } from "../../../dataAccess/IdentityRepository/IdentityRepository";
import { IHashProvider } from "../../../providers/HashProvider";
import { IJWTProvider } from "../../../providers/JWTProvider";
import { IAddIdentityDTO } from "../../DTOs/identityDTOs/AddIdentityDTO";
import { IIdentity } from "../../entities/Identity";

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
    //DEBT: verify if user already exists

    const jwt = this.jwtProvider.generate({ email: data.email });
    const password = await this.hashProvider.hash(data.password);

    return await this.identityRepository.addIdentity({ ...data, password, jwt });
  }
}
