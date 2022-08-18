import commentModel from "../db/models/post/comment.subdoc"
import Post from "../db/models/post/post.doc"
import Comment from "../db/models/post/comment.subdoc"
import User from "../db/models/user/user.doc"

// export async function createPost(input: IPost) {
//   return Post.create<IPost>(input)
// }

export async function createPost(user, title, content) {
  // return await Post.create({ content, user })

  const post = new Post({ title, content, user })
  return await post.save()
}

export async function findPosts() {
  return await Post.find()
    .populate("user comments.user")
    .sort({ createdAt: -1, "comments.createdAt": -1 })
}

export async function findPost(query) {
  return Post.findOne(query).populate("user", "_id username")
}

export async function postLike(userId, postId) {
  function incLike() {
    return Post.findByIdAndUpdate(postId, { $push: { likedBy: userId } }, { new: true })
  }
  function decLike() {
    return Post.findByIdAndUpdate(postId, { $pull: { likedBy: userId } }, { new: true })
  }

  const post = await Post.findOne({ _id: postId, likedBy: { $in: userId } })

  const isUserLikedPost = !post ? await incLike() : await decLike()
  const likesCount = await Post.findById(postId)
  // const likesCount = await Post.aggregate([
  //   { $match: { _id: post._id } },
  //   { $project: { $size: "$likedBy" } },
  // ])

  // return { isUserLikedPost, likesCount }
  return { isUserLikedPost, likesCount: likesCount.likedBy.length }
}

export async function postComment(commentData) {
  const { userId, postId, content } = commentData

  const comment = await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: { user: userId, postId, content } },
    },
    { new: true }
  )
    .select("comments")
    .populate("comments.user")

  return comment.comments.at(-1)
}

export async function getCommentAuthor(userId) {
  return await User.findById(userId).select("username")
}
