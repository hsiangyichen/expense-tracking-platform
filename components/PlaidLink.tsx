"use client";

import { setPlaidAccessToken } from "@/lib/api/axios";
import { postCreateAccessToken, postCreateLinkToken } from "@/lib/api/plaid";
import { setPlaidConnection } from "@/lib/slices/plaidSlice";
import { useAppDispatch } from "@/lib/store/store.hooks";
import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

const PlaidLink = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [linkToken, setLinkToken] = useState(null);

  const { open } = usePlaidLink({
    token: linkToken,
    onExit: () => setIsLoading(false),
    onSuccess: async (publicToken) => {
      const { data: accessToken } = await postCreateAccessToken(publicToken);
      setPlaidAccessToken(accessToken);
      dispatch(setPlaidConnection(accessToken));
      setIsLoading(false);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    postCreateLinkToken().then((res) => {
      setLinkToken(res.data.link_token);
      setIsLoading(false);
    });
  }, []);

  const handleConnectBank = async () => {
    open();
    setIsLoading(true);
  };

  return (
    <button
      disabled={isLoading}
      className="text-white bg-blue-800"
      type="button"
      onClick={handleConnectBank}
    >
      {isLoading ? "Loading..." : "Connect Bank"}
    </button>
  );
};

export default PlaidLink;
