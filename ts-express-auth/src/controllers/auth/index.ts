import { Router } from "express";
import { login } from "./login";
import { AuthRoutes } from "./routes";

const authRouter = Router();

authRouter.post(AuthRoutes.Login, login);

export { authRouter, AuthRoutes };
