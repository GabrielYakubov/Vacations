import { NextFunction, Request, Response } from 'express';
import { RouteNotFoundError } from '../4-models/Error';


const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new RouteNotFoundError(req.originalUrl);
    // Transfer the flow chain to the next middleware or the controller (router)
    next(error);
}


export default routeNotFound;