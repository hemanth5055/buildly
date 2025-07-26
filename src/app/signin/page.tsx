import SignIn from "@/Components/SignIn";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId } = await auth();
  if (userId) redirect("/");

  return <SignIn></SignIn>;
};

export default page;
