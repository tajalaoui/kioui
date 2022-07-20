import mongoose from "mongoose"

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", index: true, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

export default commentSchema
