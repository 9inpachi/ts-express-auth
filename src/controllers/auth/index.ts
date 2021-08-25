import { Router } from "express";
import { login } from "./login";
import { refresh } from "./refresh";
import { authRoutes } from "./routes";

const authRouter = Router();

authRouter.post(authRoutes.login, login);
authRouter.post(authRoutes.refresh, refresh);

export { authRouter, authRoutes };
