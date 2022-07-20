import { Router } from "express"
import { userRoute } from "./user.route"
import { postRoute } from "./post.route"
import { authRoute } from "./auth.route"

const router = Router()

router.use("/user", userRoute)
router.use("/post", postRoute)
router.use("/auth", authRoute)

export { router }
