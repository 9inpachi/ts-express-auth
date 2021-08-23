import { Router } from "express";
import { UserRoutes } from "./routes";
import { user } from "./user";

const userRouter = Router();

userRouter.get(UserRoutes.User, user);

export { userRouter, UserRoutes };
