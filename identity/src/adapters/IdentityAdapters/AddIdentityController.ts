import { Request, Response } from "express";
import { IAddIdentityDTO } from "../../domains/DTOs/identityDTOs/AddIdentityDTO";
import { IAddIdentityUseCase } from "../../domains/useCases/IdentityUseCases/AddIdentityUseCase";
import { ResponseBody } from "../../utils/ResponseBody";

export interface IAddIdentityController {
  handle(request: Request, response: Response): void;
}

export interface IRequestBody extends IAddIdentityDTO {}

export class AddIdentityController {
  constructor(private addIdentityUseCase: IAddIdentityUseCase) {}

  async handle(request: Request<any, any, IRequestBody>, response: Response) {
    const { body } = request;

    try {
      if ((!body.email && !body.phone) || !body.password) {
        return response.status(400).send(
          ResponseBody.generate({
            code: 400,
            message: "email or phone, password and username are required.",
          })
        );
      }

      const newIdentity = await this.addIdentityUseCase.execute(body);

      return response.status(200).send(
        ResponseBody.generate({
          code: 200,
          message: "new identity succesfully created",
          payload: {
            jwt: newIdentity.jwt,
            newIdentity,
          },
          status: "success",
        })
      );
    } catch (error) {
      console.error(error);
      const { message } = error as { message: string };

      return response.status(400).send(ResponseBody.generate({ code: 400, message }));
    }
  }
}
