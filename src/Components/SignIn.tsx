import { SignInButton } from "@clerk/nextjs";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-full flex h-screen justify-center items-center flex-col gap-4 pt-3">
      <h1>Please sign in to continue</h1>
      <SignInButton mode="modal">
        <button className="px-4 py-1 rounded-[10px] dark:bg-[#343638] bg-gray-200 text-black dark:text-white font-medium cursor-pointer">
          Sign In
        </button>
      </SignInButton>
    </div>
  );
};

export default SignIn;
