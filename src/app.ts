import express, { Request, Response } from "express";
import expressJwt, { UnauthorizedError } from "express-jwt";
import { json, urlencoded } from "body-parser";
import { authRouter, AuthRoutes } from "./controllers/auth";
import { SECRETS } from "./secrets";
import { userRouter } from "./controllers/user";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  expressJwt({
    secret: SECRETS.JWT_SECRET,
    requestProperty: "auth",
    algorithms: ["RS256"],
    getToken: (req) => {
      const authHeader =
        (req.headers.Authorization as string) || req.headers.authorization;
      const authToken = authHeader?.split(" ");

      if (authToken && authToken?.[0] === "Bearer") {
        return authToken[1];
      }
    },
  })
);
app.use((err: any, _req: Request, res: Response) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({
      code: 401,
      message: "Invalid access token",
    });
  }
});

app.post(AuthRoutes.Auth, authRouter);
app.get("/", userRouter);

app.listen({ port: app.get("port") }, () => {
  console.log(`Server started: http://localhost:${app.get("port")}`);
});
