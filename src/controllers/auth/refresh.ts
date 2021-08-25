import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { sampleUser } from "../../models/user";
import { SECRETS } from "../../secrets";
import { tokenFromRequest } from "../../utils/token";
import { getAuthToken } from "./login";

export const refresh = (req: Request, res: Response) => {
  const refreshToken = tokenFromRequest(req);
  if (!refreshToken) {
    res.status(400).send({
      code: 400,
      message: "No refresh token found in authorization header.",
    });

    return;
  }

  try {
    jwt.verify(refreshToken, SECRETS.JWT_SECRET, {
      complete: true,
      algorithms: ["HS256"],
    });

    const { accessToken, refreshToken: rotatedRefreshToken } =
      getAuthToken(sampleUser);

    res.status(200).send({
      accessToken,
      refreshToken: rotatedRefreshToken,
    });
  } catch (err) {
    res.status(401).send({
      code: 401,
      message: "Refresh token invalid",
    });
  }
};
