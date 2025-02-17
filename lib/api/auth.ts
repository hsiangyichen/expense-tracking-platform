import axios from "./axios";

export const postLogin = () =>
  axios.post("/api/auth/login").then((res) => res.data);
