import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create interceptor to redirect to login page if 401 error
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export const setToken = (token: string) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setPlaidAccessToken = (token: string) => {
  instance.defaults.headers.common["plaid_access_token"] = token;
};

export default instance;
