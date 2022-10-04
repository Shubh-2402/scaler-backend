import express from "express";
import Participant from "../models/Participant.js";

const router = express.Router()


//GET PARTICPANTS
router.get("/",async(req,res)=>{

    try{
        const participants = await Participant.find({});
        // console.log(participants)
        res.status(200).json(participants)
        
    }catch(error){
        res.status(500).json(error)
    }
})

//CREATE PARTICPANT
router.post("/",async(req,res)=>{

    const newParticipant = new Participant(req.body)
    // console.log(newParticipant)

    try {
        const participant = await newParticipant.save()
        res.status(200).json(participant)
    } catch (error) {
        // console.log(error)
        res.status(500).send(error)
    }
})

export default router