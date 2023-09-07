import express, { Request, Response, NextFunction } from 'express';
import User from '../4-models/User';
import { login, register } from '../5-logic/auth-logic';
import Credentials from '../4-models/Credentials';


const router = express.Router();

//register
router.post('/auth/register', async (request: Request, response: Response, next: NextFunction) => {
    try {
        //get data from browser
        const user = new User(request.body);
        //await for a token to get generated
        const token = await register(user);
        //respond with "created" status and token
        response.status(201).json(token);
    } catch (err) {
        //pass error to middleware
        next(err);
    }

});


//login 
router.post('/auth/login', async (request: Request, response: Response, next: NextFunction) => {
    try {
        //request credentials from browser
        const credentials = new Credentials(request.body);
        //await login function response
        const token = await login(credentials);
        //respond with token
        response.json(token);
    } catch (err) {
        //pass error to middleware
        next(err);
    }
})



export default router;