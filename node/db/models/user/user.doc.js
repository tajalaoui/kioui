import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next()

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password, salt)
  this.password = hash

  return next()
})

// TODO add expiration
userSchema.methods.generateAuthToken = async function () {
  return jwt.sign({ userId: this._id.toString(), username: this.username }, process.env.JWT_SECRET)
}

userSchema.methods.isValidCredentials = async function (userPassword) {
  const errorMessage =
    "The email address or password that you've entered doesn't match any account."

  const isMatch = await bcrypt.compare(userPassword, this.password)
  if (!isMatch) throw new Error(errorMessage)

  return isMatch
}

const User = mongoose.model("User", userSchema)

export default User
