export const createLinkToken = async (userId: string) => {
  const response = await fetch("/api/plaid/create-link-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) throw new Error("Failed to create link token");
  return response.json();
};

export const exchangePublicToken = async (
  public_token: string,
  userId: string
) => {
  const response = await fetch("/api/plaid/exchange-public-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_token, userId }),
  });
  if (!response.ok) throw new Error("Failed to exchange token");
  return response.json();
};
