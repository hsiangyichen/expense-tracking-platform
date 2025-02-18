import axios from "./axios";

export const postCreateAccessToken = (publicToken: string) =>
  axios
    .post("/api/plaid/auth/create-access-token", { publicToken })
    .then((res) => res.data);

export const postCreateLinkToken = () =>
  axios.post("/api/plaid/auth/create-link-token").then((res) => res.data);

export const fetchBalance = () =>
  axios.get("/api/plaid/balance").then((res) => res.data);

// export const fetchTransactions = () =>
//   axios.get("/api/plaid/transactions").then((res) => res.data);
