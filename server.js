import {} from "dotenv/config"
import express from "express"
import helmet from "helmet"
import mongoose from "mongoose"
import morgan from "morgan"
import cors from "cors"

const app = express()
const port = process.env.PORT || 5000

//DB CONFIG

mongoose.connect(process.env.MONGODB_CONNECTION_URL,
    {useNewUrlParser:true},
    ()=>{
        console.log("MONGODB CONNECTED");
    })

//middleware

app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())

app.listen(port,()=>{
    console.log("Server running at "+port)
})