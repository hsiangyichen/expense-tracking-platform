"use client";

import { postLogin } from "@/lib/api/auth";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

const AuthCallback = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await postLogin();
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    fetchToken();
  }, [getToken]);

  return null;
};

export default AuthCallback;
