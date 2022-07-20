import axios from "@services/axios.service"

export async function getUserService(id) {
  let response

  if (!id) {
    response = await axios.get("/user")
    return response.data
  }

  response = await axios.get("/user", { params: { id } })
  return response.data
}

export async function updateUserService(id, data) {
  return await axios.put(`/user/${id}`, data)
}

export async function deleteUserService(id) {
  return await axios.delete(`/user/${id}`)
}
