import express, { NextFunction, Request, Response } from "express";
import expressJwt from "express-jwt";
import { json, urlencoded } from "body-parser";
import { authRouter, authRoutes } from "./controllers/auth";
import { SECRETS } from "./secrets";
import { userRouter, userRoutes } from "./controllers/user";
import { tokenFromRequest } from "./utils/token";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  expressJwt({
    secret: SECRETS.JWT_SECRET,
    requestProperty: "user",
    algorithms: ["HS256"],
    getToken: tokenFromRequest,
  }).unless({ path: [/^\/assets/, /^\/auth/] })
);
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({
      code: 401,
      message: "Invalid access token",
    });
  } else {
    next(err);
  }
});

app.use(authRoutes.root, authRouter);
app.use(userRoutes.root, userRouter);

app.listen({ port: app.get("port") }, () => {
  console.log(`Server started: http://localhost:${app.get("port")}`);
});
