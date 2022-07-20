import mongoose from "mongoose"

// TODO add option to sync indexes
export async function connectToMongo() {
  const mongoUri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_NAME}`
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  try {
    await mongoose.connect(mongoUri, options)
    console.log("Connected to Database ✅")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
