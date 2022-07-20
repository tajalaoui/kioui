import { app } from "./app.js"
import { connectToMongo } from "../db/mongo.js"

async function bootstrap() {
  const PORT = process.env.APP_PORT || 3000

  try {
    app.listen(PORT, () => {
      console.log("Connected to server ✅")
    })

    await connectToMongo()
  } catch (e) {
    console.log(e)
  }
}

bootstrap()
