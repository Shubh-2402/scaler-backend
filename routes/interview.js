import express from "express";
import InterviewRoom from "../models/InterviewRoom.js";

const router = express.Router()


//GET Interview Room
router.get("/",async(req,res)=>{

    try{
        const interviews = await InterviewRoom.find({});
        // console.log(participants)
        res.status(200).json(interviews)
        
    }catch(error){
        res.status(500).json(error)
    }
})

//CREATE Interview Room
router.post("/",async(req,res)=>{

    const newInterview = new InterviewRoom(req.body)
    // console.log(newParticipant)

    try {
        const interview = await newInterview.save()
        res.status(200).json(interview)
    } catch (error) {
        // console.log(error)
        res.status(500).send(error)
    }
})

export default router