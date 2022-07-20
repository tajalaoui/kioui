import { Router } from "express"
import { findUserById, findUsers } from "../controllers/user.controller"

const router = Router()

// Find user
router.get("/:id?", async (req, res) => {
  const { id } = req.query

  try {
    if (id) {
      const query = await findUserById(id)
      return res.send(query)
    }

    const query = await findUsers()
    res.send(query)
  } catch (e) {
    res.send(e)
  }
})

export const userRoute = router
