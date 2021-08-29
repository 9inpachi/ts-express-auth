import { Request, Response } from "express";
import { sampleUser } from "../../models/user";

export const user = (_req: Request, res: Response) => {
  // console.log(_req.user);
  res.status(200).send({
    username: sampleUser.username,
    fullName: sampleUser.fullName,
    email: sampleUser.email,
  });
};
