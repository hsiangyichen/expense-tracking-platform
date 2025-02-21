"use client";

import React, { useState, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { revalidateAccounts } from "@/lib/actions/revalidation.action";
import { createLinkToken, exchangePublicToken } from "@/lib/services/plaid";
import { PlaidLinkProps } from "./PlaidLink.types";

const PlaidLink = ({ user }: PlaidLinkProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const initializePlaidLink = async () => {
      try {
        setLoading(true);
        const { link_token } = await createLinkToken(user.id);
        setToken(link_token);
      } catch (err) {
        console.error("Error creating link token:", err);
        setError("Failed to initialize Plaid. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    initializePlaidLink();
  }, [user.id]);

  const onSuccess = useCallback(
    async (public_token: string) => {
      try {
        setLoading(true);
        setError(null);

        await exchangePublicToken(public_token, user.id);

        // Revalidate account data to see changes without full refresh
        await revalidateAccounts();
      } catch (err) {
        console.error("Error exchanging public token:", err);
        setError("Failed to connect your account. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [user.id]
  );

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    onExit: (err) => {
      if (err) {
        console.error("User exited with error:", err);
      } else {
        console.log("User exited Plaid Link");
      }
    },
  });

  return (
    <div className="space-y-3">
      <button
        onClick={() => open()}
        disabled={!ready || !token || loading}
        className={`w-full py-2 rounded-md text-white ${
          !ready || !token || loading
            ? "text-zinc-400 cursor-not-allowed"
            : "text-zinc-500 hover:text-zinc-900"
        }`}
        type="button"
      >
        {loading ? "Loading..." : "Connect Bank"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default PlaidLink;
