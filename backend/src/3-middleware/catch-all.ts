import { NextFunction, Request, Response } from "express";
import logger from "../2-utils/logger";

const catchAll = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //log the error to the console
  console.log(err);

  //log the errors to our logger file
  await logger("logger-fs", err.message);

  // send back the error to the client
  res.status(err.status).send(err.message);
};

export default catchAll;
