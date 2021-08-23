import { Request, Response } from "express";
import { sampleUser } from "../../models/user";

export const user = (_req: Request, res: Response) => {
  res.status(200).send(sampleUser);
};
