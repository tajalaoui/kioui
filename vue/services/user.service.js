import axios from "@services/axios.service"

export async function getUsersService() {
  return await axios.get("/user")
}

export async function getUserService(id) {
  return await axios.get(`/user`, { params: { id } })
}

export async function updateUserService(id, data) {
  return await axios.put(`/user/${id}`, data)
}

export async function deleteUserService(id) {
  return await axios.delete(`/user/${id}`)
}
