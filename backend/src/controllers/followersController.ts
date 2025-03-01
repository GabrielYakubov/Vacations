import express, { Request, Response, NextFunction, json } from "express";
import * as followersLogic from "../5-logic/followers-logic";
import { parse as json2csv} from 'json2csv'
import fs from 'fs/promises'
import path from 'path'
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";
import Likes from "../4-models/Likes";

const router = express.Router();

//add like
router.post('/likes/',(request: Request, response: Response, next: NextFunction) => {
    try{
      //request vacationId and userId from browser
      const {vacationId, userId} = request.body
      //pass ids to addLike logic funtion
      const addedLike = followersLogic.addLike(vacationId, userId)
      //respond with "created" status and add like
      response.status(201).json(addedLike)
    }catch(err){
      //pass error to middleware
      next(err)
    }
  
  })
  
  //delete like
  router.delete('/likes/:vacationId([0-9]+)/:userId([0-9]+)', [verifyLoggedIn], async (request: Request, response: Response, next: NextFunction) => {
    try {
        //request vacationId and userId from browser
        const {vacationId, userId} = request.params
        //pass ids to delete function
        await followersLogic.deleteLike(+vacationId,+userId);
        //respond with no content
        response.sendStatus(204);
    } catch (err) {
      //pass error to middleware
        next(err);
    }
  });


  //get all likes
  router.get('/likes',[verifyLoggedIn], async (request:Request, response:Response, next:NextFunction) => {
    try{
      //wait for getAllLikes function response
      const likes = await followersLogic.getAllLikes()
      //send response to frontend 
      response.json(likes)
    }catch(err){
      //pass error to middleware
      next(err)
    }
  
  })
  
  //get followers chart data
  router.get('/followers',[verifyLoggedIn], async (request:Request, response:Response, next:NextFunction) => {
    try{
      //await response from graph function
      const followers = await followersLogic.getGraphData()
      //send data to frontend
      response.json(followers)
    }catch(err){
      //pass error to middleware
      next(err)
    }
  
  })
  
  
  // csv requires some work
  router.get('/followers/csv',[verifyLoggedIn,verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
    try {
      //await response from graph function
        const followers = await followersLogic.getGraphData();
        //specify the fields/columns names you want to export
        const fields = ["destination", "followers"];
        const csv = json2csv(followers as Likes[], { fields });
        //write csv string to a file
        const dateTime = Date.now();
        const dirPath = path.join(__dirname, "..", "..", "public", "exports");
        const filePath = path.join(dirPath, `vacations-${dateTime}.csv`);
        //create the directory if it does not exists
        await fs.mkdir(dirPath, { recursive: true });
        await fs.writeFile(filePath, csv);
        //set the headers so the browser knows this is a downloadable file
        response.setHeader('Content-Type', "text/csv");
        response.setHeader("Content-Disposition", `attachment; filename=vacations-${dateTime}.csv`);
        //response as download
        response.download(filePath);
    } catch (err) {
      //pass error to middleware
        next(err);
    }
  });


  export default router;