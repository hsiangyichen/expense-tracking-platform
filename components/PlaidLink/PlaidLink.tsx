"use client";

import React, { useEffect, useState, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { cn } from "@/lib/utils";
import { CreditCard, Plus } from "lucide-react";
import { revalidateAccounts } from "@/lib/actions/revalidation.action";
import { createLinkToken, exchangePublicToken } from "@/lib/services/plaid";
import { PlaidLinkProps } from "./PlaidLink.types";

const PlaidLink = ({ user, type }: PlaidLinkProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
      }
    },
  });

  return (
    <div
      className={cn(
        "",
        type === "right-sidebar"
          ? ""
          : "hover:border-b-stone-200 border-b-[1.5px] border-transparent hover:shadow-sm transition-all duration-200"
      )}
    >
      <button
        onClick={() => open()}
        disabled={!ready || !token || loading}
        className={cn(
          "flex items-center",
          {
            "opacity-50 cursor-not-allowed": !ready || !token || loading,
          },
          type === "right-sidebar"
            ? "p-0 gap-1 hover:text-stone-900 transition-all duration-200 text-stone-500"
            : "gap-3 min-w-max px-6 py-4 xl:pl-1 pt-4 md:pt-5 md:max-xl:justify-center xl:justify-start w-full text-stone-800"
        )}
        type="button"
      >
        <div className="relative size-5">
          {type === "right-sidebar" ? (
            <Plus strokeWidth={1.75} className="size-5" />
          ) : (
            <CreditCard strokeWidth={1.75} className="size-5" />
          )}
        </div>
        <p
          className={cn(
            "font-medium md:max-xl:hidden",
            type === "right-sidebar" ? "text-14" : "text-16"
          )}
        >
          {loading
            ? "Connecting..."
            : type === "right-sidebar"
            ? "Add Card"
            : "Connect Bank"}
        </p>
      </button>

      {error && (
        <p className="text-red-500 text-sm absolute bottom-[-24px] left-0">
          {error}
        </p>
      )}
    </div>
  );
};

export default PlaidLink;
