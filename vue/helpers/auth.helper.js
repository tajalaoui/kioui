import { setToken } from "./token.helper"

export function register(payload) {
  setToken(payload)
}
export function login(payload) {
  setToken(payload)
}
export function logout() {
  localStorage.removeItem("token")
  location.reload()
}
