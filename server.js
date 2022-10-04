import {} from "dotenv/config"
import express from "express"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from "morgan"
import cors from "cors"

import participantsRoute from "./routes/participant.js"
import interviewsRoute from "./routes/interview.js"

const app = express()
const port = process.env.PORT || 5000

//DB CONFIG

mongoose.connect(process.env.MONGODB_CONNECTION_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(()=>console.log('MONGODB CONNECTED'))
      .catch(e=>console.log(e));

//middleware

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

//API ROUTES

app.use("/api/participants",participantsRoute)
app.use("/api/interviews",interviewsRoute)

app.listen(port,()=>{
    console.log("Server running at "+port)
})