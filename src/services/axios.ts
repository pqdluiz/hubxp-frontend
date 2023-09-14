import axios from "axios";

export const api = axios.create({
  baseURL: process.env.DATABASE_URL,
});

console.log(api.getUri())