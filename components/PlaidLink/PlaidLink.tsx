"use client";

import React, { useState, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { cn } from "@/lib/utils";
import { CreditCard } from "lucide-react";
import { revalidateAccounts } from "@/lib/actions/revalidation.action";
import { createLinkToken, exchangePublicToken } from "@/lib/services/plaid";
import { PlaidLinkProps } from "./PlaidLink.types";

const PlaidLink = ({
  user,
  className,
}: PlaidLinkProps & { className?: string }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const initializePlaidLink = async () => {
      try {
        setLoading(true);
        const { link_token } = await createLinkToken(user.id);
        console.log("link_token", link_token);
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
      console.log("public_token", public_token);
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
    <div className={cn("relative", className)}>
      <button
        onClick={() => open()}
        disabled={!ready || !token || loading}
        className={cn(
          "flex gap-3 items-center min-w-max py-1 md:py-3 2xl:py-4 rounded-lg md:max-xl:justify-center xl:justify-start border-b-[1px] border-transparent w-full transition-all duration-200",
          {
            "opacity-50 cursor-not-allowed": !ready || !token || loading,
            "hover:border-b-[1px] !hover:border-zinc-200":
              ready && token && !loading,
          }
        )}
        type="button"
      >
        <div className="relative size-6">
          <CreditCard className="size-6 text-neutral-800" />
        </div>
        <p className="text-16 font-semibold text-neutral-800 md:max-xl:hidden">
          {loading ? "Connecting..." : "Connect Bank"}
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
