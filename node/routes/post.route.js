import { Router } from "express"
import {
  createPost,
  findPosts,
  findPost,
  postComment,
  postLike,
} from "../controllers/post.controller"
import { isAuth } from "../middlewares/isAuth.middleware"

const router = Router()

router.post("/", isAuth, async (req, res) => {
  const { title, content, id } = req.body

  try {
    const query = await createPost(id, title, content)
    res.send(query)
  } catch (error) {
    res.send(error)
  }
})

router.get("/:id?", isAuth, async (req, res) => {
  const { id } = req.query

  try {
    if (id) {
      const post = await findPost({
        _id: id,
      })

      return res.send(post)
    }

    const posts = await findPosts()
    res.send(posts)
  } catch (e) {
    res.send(e)
  }
})

router.put("/like", isAuth, async (req, res) => {
  const { userId, postId } = req.body

  try {
    const query = await postLike(userId, postId)
    res.send(query)
  } catch (error) {
    res.send(error)
  }
})

router.post("/comment", isAuth, async (req, res) => {
  const commentData = req.body
  try {
    const query = await postComment(commentData)
    res.send(query)
  } catch (error) {
    res.send(error)
  }
})

export const postRoute = router
