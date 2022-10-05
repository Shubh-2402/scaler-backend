import express from "express";
import nodemailer from 'nodemailer';
import InterviewRoom from "../models/InterviewRoom.js";

const router = express.Router()

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
  });

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
    
    try {

    const newInterview = new InterviewRoom(req.body)
    const {participants,admins,startTime,endTime} = newInterview;

    console.log(startTime)

    if(participants.length<1 || admins.length<1){
        return res.status(422).send("Select atleast 1 interviewer and interviewee")
    }

    const interviews = await InterviewRoom.find({
        $or: [
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gte: startTime, $lte: endTime } },
          ],
    })

    console.log(interviews.length)

    if (interviews.length){

        for(var i=0;i<interviews.length;i++){

            const filteredArray = admins.filter(value => interviews[i].admins.includes(value))

            if(filteredArray.length){
                return res.status(422).send("Interview Cannot be Scheduled because of Time conflict of Admin")
            }
        }


        
        for(var j=0;j<interviews.length;j++){

            const filteredArray = participants.filter(value => interviews[j].participants.includes(value))

            if(filteredArray.length){
                return res.status(422).send("Interview Cannot be Scheduled because of Time conflict of Interviewers")
            }
        }
        
    }

    const interview = await newInterview.save()

    const mailOptions = {
        from: 'scalerassignment@gmail.com', // Sender address
        to: participants.concat(admins), // List of recipients
        subject: 'Interview Scheduled', // Subject line
        text: `Please join the interview at ${startTime}`, // Plain text body
    };
    
    transporter.sendMail(mailOptions);

    res.status(200).json(interview)

    }catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.put("/",async(req,res)=>{
    
    try {

    const {participants,admins,startTime,endTime,_id} = req.body;

    // console.log(startTime)

    if(participants.length<1 || admins.length<1){
        return res.status(422).send("Select atleast 1 interviewer and interviewee")
    }

    const interviews = await InterviewRoom.find({
        $or: [
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gte: startTime, $lte: endTime } },
          ],
    })

    // console.log(interviews.length)

    if (interviews.length){

        for(var i=0;i<interviews.length;i++){

            const filteredArray = admins.filter(value => interviews[i].admins.includes(value))

            if(filteredArray.length){
                return res.status(422).send("Interview Cannot be Scheduled because of Time conflict of Admin")
            }
        }


        
        for(var j=0;j<interviews.length;j++){

            const filteredArray = participants.filter(value => interviews[j].participants.includes(value))

            if(filteredArray.length){
                return res.status(422).send("Interview Cannot be Scheduled because of Time conflict of Interviewers")
            }
        }
        
    }


    const interview = await InterviewRoom.findByIdAndUpdate(_id, {participants,admins,startTime,endTime})
    res.status(200).json(interview)

    }catch (error) {
        // console.log(error)
        res.status(500).send(error)
    }
})

export default router