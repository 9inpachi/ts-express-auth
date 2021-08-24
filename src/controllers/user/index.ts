import { Router } from "express";
import { userRoutes } from "./routes";
import { user } from "./user";

const userRouter = Router();

userRouter.get(userRoutes.profile, user);

export { userRouter, userRoutes };
