import User from "../db/models/user/user.doc"
// import User from "@models/models/user/user.doc"

export async function createUser(input) {
  const user = await User.create(input)
  const token = await user.generateAuthToken()
  const { id, username } = user

  return { id, username, token }
}

export async function findUsers() {
  return User.find()
}

export async function findUser(query) {
  return User.findOne({ query })
}

export async function findUserById(id) {
  return User.findById(id)
}

export async function loginUser(data) {
  const { email, password } = data

  const user = await findUser(email)
  if (!user) throw new Error("User does not exist")
  const token = await user.generateAuthToken()
  user.isValidCredentials(password)

  const { id, username } = user

  return { id, username, token }
}
