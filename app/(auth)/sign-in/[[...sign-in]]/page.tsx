import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <SignIn />
    </section>
  );
};

export default SignInPage;
