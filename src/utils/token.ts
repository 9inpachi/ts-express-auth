import { Request } from "express";

export const tokenFromRequest = (req: Request) => {
  const authHeader =
    (req.headers.Authorization as string) || req.headers.authorization;
  const authToken = authHeader?.split(" ");

  if (authToken && authToken?.[0] === "Bearer") {
    return authToken[1];
  }
};
