import mongoose from "mongoose"

const participantSchema = new mongoose.Schema({

        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:["Interviewer","Interviewee"]
        }
    },
    {timestamps:true})

export default mongoose.model("Participant",participantSchema)