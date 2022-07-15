import axios from "@services/axios.service"

export async function getPostService(id) {
  let response
  
  if (!id) {
    response = await axios.get("/post")
    return response.data
  }

  response = await axios.get("/post", { params: { id } })
  return response.data
}

export async function createPostService(post) {
  const response = await axios.post("/post", post)
  return response.data
}

export async function updatePostService(id, newTask) {
  return await axios.put(`/post/${id}`, newTask)
}

export async function deletePostService(id) {
  return await axios.delete(`/post/${id}`)
}

export async function commentService(content) {
  const response = await axios.post("/post/comment", content)
  return response.data
}

export async function likeService(like) {
  const response = await axios.put("/post/like", like)
  return response.data
}
