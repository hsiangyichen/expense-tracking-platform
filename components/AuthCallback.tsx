"use client";

import { postLogin } from "@/lib/api/auth";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallback = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await postLogin();
      } catch {
        router.push("/sign-in");
      }
    };

    fetchToken();
  }, [getToken, router]);

  return null;
};

export default AuthCallback;
