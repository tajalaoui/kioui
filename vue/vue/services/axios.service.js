import axios from "axios"
import { getToken } from "@helpers/token.helper"

const config = {
  baseURL: "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}

const token = getToken()

if (token) config.headers["Authorization"] = `Bearer ${token}`

const axiosInstance = axios.create(config)

export default axiosInstance
