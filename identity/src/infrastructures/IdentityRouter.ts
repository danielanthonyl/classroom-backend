import { Router } from "express";
import { AddIdentityController } from "../adapters/IdentityAdapters/AddIdentityController";
import { IdentityRepository } from "../dataAccess/IdentityRepository/IdentityRepository";
import { AddIdentityUseCase } from "../domains/useCases/IdentityUseCases/AddIdentityUseCase";
import { HashProvider } from "../providers/HashProvider";
import { JWTProvider } from "../providers/JWTProvider";

const identityRouter = Router();
const jwtProvider = new JWTProvider();
const hashProvider = new HashProvider();

const addIdentityUseCase = new AddIdentityUseCase(IdentityRepository, jwtProvider, hashProvider);
const addIdentityController = new AddIdentityController(addIdentityUseCase);

identityRouter.post("/identity/new", (request, response) => addIdentityController.handle(request, response));

export { identityRouter };
