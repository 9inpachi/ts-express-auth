import { json, urlencoded } from "body-parser";
import express from "express";
import { authRouter, AuthRoutes } from "./controllers/auth";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send({
    hello: "world",
  });
});
app.post(AuthRoutes.Auth, authRouter);

app.listen({ port: app.get("port") }, () => {
  console.log(`Server started: http://localhost:${app.get("port")}`);
});
