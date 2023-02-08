import { Request, Response } from "express";
import { IAddIdentityUseCase } from "../../domains/useCases/IdentityUseCases/AddIdentityUseCase";
import { ResponseBody } from "../../utils/ErrorBody";

export interface IAddIdentityController {
  handle(request: Request, response: Response): void;
}

export class AddIdentityController {
  constructor(private addIdentityUseCase: IAddIdentityUseCase) {}

  async handle(request: Request, response: Response) {
    const { body } = request;

    try {
      if (!body.email || !body.password || !body.confirmPassword || !body.username) {
        return response.status(400).send(
          ResponseBody.generate({
            code: 400,
            message: "email, password, confirmPassword and username are required.",
          })
        );
      }

      const { email, password, confirmPassword, username } = body;

      if (password !== confirmPassword) {
        return response.status(400).send(
          ResponseBody.generate({
            code: 400,
            message: "password and confirmation do not match.",
          })
        );
      }

      const newIdentity = await this.addIdentityUseCase.execute({
        email,
        password,
        username,
      });

      return response.status(200).send(
        ResponseBody.generate({
          code: 200,
          message: "new identity succesfully created",
          payload: {
            jwt: newIdentity.jwt,
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
