import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <SignUp />
    </section>
  );
};

export default SignUpPage;
