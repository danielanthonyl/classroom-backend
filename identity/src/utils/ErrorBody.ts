export interface IGenerateResponseBodyPayload<payloadContent> {
  [args: string]: payloadContent;
}

export interface IGenerateResponseBodyParams<payloadContent> {
  status?: string;
  message?: string;
  code: number;
  payload?: IGenerateResponseBodyPayload<payloadContent>;
}

export class ResponseBody {
  constructor() {}

  static generate<payloadContent>({
    payload,
    code = 400,
    message = "Unexpected error",
    status = "error",
  }: IGenerateResponseBodyParams<payloadContent>) {
    return {
      code,
      message,
      status,
      payload,
    };
  }
}
