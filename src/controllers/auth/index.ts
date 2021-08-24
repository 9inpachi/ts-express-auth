import { Router } from "express";
import { login } from "./login";
import { authRoutes } from "./routes";

const authRouter = Router();

authRouter.post(authRoutes.login, login);

export { authRouter, authRoutes };
