import axios from "@services/axios.service"

export function getToken() {
  return localStorage.getItem("token")
}

export function setToken(token) {
  localStorage.setItem("token", token)
}

export async function verifyToken() {
  return await axios.post("/auth/token", { token: getToken() })
}
