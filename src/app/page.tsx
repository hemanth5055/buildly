import { getUserByClerkId, syncUser } from "@/actions/user";
import Loading from "@/Components/Loading";
import Projects from "@/Components/Projects";
import Prompt from "@/Components/Prompt";
import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/signin");
  // const syncUserwithDb = await syncUser(); // <-- Await added
  const { success, user } = await getUserByClerkId(userId);
  if (!success || !user) redirect("/signin");
  return (
    <div className="w-full flex flex-col gap-4 p-3">
      {/* navbar */}
      <div className="w-full flex justify-between items-center ">
        <h1 className="font-medium text-[40px] text-[#ffffff] tracking-[-1.2px]">
          Buildly
        </h1>
        <div className="flex gap-4 items-center">
          <div className=" h-[40px] flex gap-1 rounded-full items-center justify-center cursor-pointer">
            {" "}
            Credits : {user?.credits}
          </div>
          <SignOutButton redirectUrl="/signin">
            <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
              <LogOut />
            </div>
          </SignOutButton>
        </div>
      </div>

      {/* prompt-area */}
      <Prompt></Prompt>

      <div className="w-full flex flex-col gap-4 p-4">
        <h1 className="font-medium text-[20px] tracking-[-1px]">
          Your Project's
        </h1>
        {/* user-previous-prompted-projects */}
        <React.Suspense fallback={<Loading></Loading>}>
          <Projects id={user.id}></Projects>
        </React.Suspense>
      </div>
    </div>
  );
};

export default Page;
