import { Router } from "express"
import { createUser, loginUser } from "../controllers/user.controller"
import jwt from "jsonwebtoken"

const router = Router()

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body

  const query = await createUser({
    username,
    email,
    password,
  })
  res.send(query)
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const query = await loginUser({
      email,
      password,
    })

    res.send(query)
  } catch (e) {
    console.log(e)
    res.status(400).send("Error occured")
  }
})

router.post("/token", (req, res) => {
  const { token } = req.body

  try {
    const query = jwt.verify(token, process.env.JWT_SECRET)

    res.send(query)
  } catch (e) {
    console.log(e)
    res.status(400).send("Error occured")
  }
})

export const authRoute = router
