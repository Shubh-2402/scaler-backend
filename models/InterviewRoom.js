import mongoose from "mongoose"

const interviewRoomSchema = new mongoose.Schema({

        title:{
            type:String,
            required:true
        },
        startTime:{
            type:Date,
            required:true
        },
        endTime:{
            type:Date,
            required:true
        },
        admins:{
            type:Array,
            default:[]
        },
        participants:{
            type:Array,
            default:[]
        }
    },
    {timestamps:true})

export default mongoose.model("InterviewRoom",interviewRoomSchema)