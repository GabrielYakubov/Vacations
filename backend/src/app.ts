import express, { Request, Response, NextFunction, json } from 'express';
import cors from 'cors'
import vacationController from './controllers/vacation-controller';
import followerController from './controllers/followersController'
import authController from './controllers/authController';
import deleteMessage from './3-middleware/delete-message';
import routeNotFound from './3-middleware/route-not-found';
import dotenv from 'dotenv'
import catchAll from './3-middleware/catch-all';
// import logRequest from './3-middleware/log-request';
import expressFileUpload from 'express-fileupload'
import CONFIG from './config';

dotenv.config();

// Create express server
const server = express();

server.use(cors())
// Tell express to take the json resides in requests body and attache it to the body object
server.use(express.json());

//integrae express file upload middleware to handle uploaded files - and in order to work with form data
server.use(expressFileUpload());
// vacation route
server.use('/api', vacationController, authController, followerController)

server.use('*', routeNotFound)

// catch all middleware
server.use(catchAll);


// running the server on a port
server.listen(CONFIG.PORT, () => {
    console.log(`listening on http://localhost:${CONFIG.PORT}`)
});

