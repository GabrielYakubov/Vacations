import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../4-models/Error";
import Role from "../4-models/Role";


//verifies if current user is admin
const verifyAdmin = async (request: Request, response: Response, next: NextFunction) => {
  const user = request?.user;
  const isAdmin = user?.role === Role.Admin;
  const unauthorizedError = new UnauthorizedError("you are not authorized");

  if (!user) {
    next(unauthorizedError);
  }


  if (!isAdmin) {
    next(unauthorizedError);
  }

  next();
};

export default verifyAdmin;