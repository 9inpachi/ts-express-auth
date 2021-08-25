import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { SECRETS } from "../../secrets";
import { sampleUser, User } from "../../models/user";

const authenticate = (username: string, password: string) =>
  username === sampleUser.username && password === sampleUser.password;

export const getAuthToken = (payload: any = {}) => {
  const accessToken = jwt.sign(
    // This is session information in token.
    payload,
    SECRETS.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "30s" }
  );
  const refreshToken = jwt.sign({}, SECRETS.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "2m",
  });

  return { accessToken, refreshToken };
};

export const login = async (req: Request, res: Response): Promise<void> => {
  await check("username", "Invalid username").notEmpty().run(req);
  await check("password", "Invalid password").notEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({
      code: 406,
      message: errors,
    });

    return;
  }

  if (!authenticate(req.body.username, req.body.password)) {
    res.status(401).send({
      code: 401,
      message: "Username or password incorrect",
    });

    return;
  }

  try {
    const { accessToken, refreshToken } = getAuthToken(sampleUser);

    res.status(200).send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).send({
      code: 400,
      error,
    });
  }
};
