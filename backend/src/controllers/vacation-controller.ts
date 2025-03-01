import express, { Request, Response, NextFunction, json } from "express";
import * as vacationLogic from "../5-logic/vacation-logic";
import deleteMessage from "../3-middleware/delete-message";
import Vacation from "../4-models/Vacation";
import path from 'path'
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router();


// get all vacations
router.get("/vacation/:page",[verifyLoggedIn],async (request: Request, response: Response, next: NextFunction) => {
    try {
      const offset = request.params.page
    //   await vacations from vacation logic and place it into a variable
      const vacations = await vacationLogic.getAllVacations(+offset);
    //   parse jsopn response
      response.json(vacations);
    } catch (err: any) {
    // catch any errors and pass it to the next middleware
    next(err);
}
}
);


//vacation image route
router.get('/vacation/image/:imageName',async (request:Request,response:Response,next:NextFunction) => {
    //request image from params
    const imageName = request.params.imageName
    //set path for image
    const absolutePath = path.join(__dirname,'..','1-assets','images',imageName)
    //add image to specified path
    response.sendFile(absolutePath)
})


//add vacation
router.post('/vacation',[verifyLoggedIn,verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {

        //take upladed file, set it to the body
        request.body.image = request.files?.image;
        //request vacation details
        const vacation = new Vacation(request.body);
        //pass vacation to addVacation logic function
        const addedVacation = await vacationLogic.addVacation(vacation);
        //return response data with status "created"
        response.status(201).json(addedVacation);
    } catch (err) {
        //pass error to middleware
        next(err);
    }
});



//update vcation
router.put('/vacation/:vacationId([0-9]+)',[verifyLoggedIn,verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
        //request vacation id from browser
        const id = +request.params.vacationId;
        //set id recieved from body back to vacation
        request.body.vacationId = id;
        //take uploaded file
        request.body.image = request.files?.image;
        //created new vacation item
        const vacation = new Vacation(request.body);
        //pass new vacation to logic function
        const updatedVacation = await vacationLogic.updateVacation(vacation);
        //send json response data
        response.json(updatedVacation);
    } catch (err) {
        //pass error to middleware
        next(err);
    }
});

//delete vacation
router.delete('/vacation/:vacationId([0-9]+)', [verifyLoggedIn,verifyAdmin,deleteMessage], async (request: Request, response: Response, next: NextFunction) => {
    try {
        //request vacation id from browser
        const vacationId = +request.params.vacationId;
        //pass id to logic function
        await vacationLogic.deleteVacation(vacationId);
        //respond with no content status
        response.sendStatus(204);
    } catch (err) {
        //pass error to middleware
        next(err);
    }
});



export default router;