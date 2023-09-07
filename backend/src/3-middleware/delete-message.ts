import { NextFunction, Request, Response } from 'express';

const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Vacation has been deleted')
    // Transfer the flow chain to the next middleware or the controller (router)
    next();
}


export default deleteMessage;

