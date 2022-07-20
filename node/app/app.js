import express from "express"
const app = express()
import bodyParser from "body-parser"
import helmet from "helmet"
import cors from "cors"
import "dotenv/config"
import { router } from "../routes/routes"

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", router)

export { app }
