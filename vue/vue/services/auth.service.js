import axios from "@services/axios.service"

export async function registerService(userData) {
  const response = await axios.post("/auth/register", userData)
  axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
  return response.data
}

export async function loginService(userData) {
  const response = await axios.post("/auth/login", userData)
  axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
  return response.data
}
