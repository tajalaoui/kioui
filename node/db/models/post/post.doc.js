import mongoose from "mongoose"
import Comment from "./comment.subdoc"

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
    comments: [Comment],
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
        unique: false,
        required: false,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model("Post", postSchema)
