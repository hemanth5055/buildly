import { LogOut, MoveUpRight, Trash } from "lucide-react";
import React from "react";

const page = () => {
  
  return (
    <div className="w-full flex flex-col gap-4 p-3">
      {/* navbar */}
      <div className="w-full flex justify-between items-center ">
        {/* name */}
        <h1 className="font-medium text-[40px] text-[#ffffff] tracking-[-1.2px]">
          Buildly
        </h1>
        {/* logout */}
        <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
          <LogOut />
        </div>
      </div>

      {/* prompt-area */}
      <div className="w-full flex flex-col gap-4 items-center mt-[100px] mb-[30px]">
        {/* prompt-box */}
        <textarea
          name="prompt"
          id="prompt"
          className="w-[60%] h-[200px] rounded-[10px] bg-[#121212] outline-none p-4 text-[20px] resize-none"
          placeholder="What are you planning to create?"
        ></textarea>
        {/* button-to-generate-website */}
        <div className="bg-[#121212] px-4 py-2 rounded-[5px] text-white cursor-pointer">
          Generate 🚀
        </div>
      </div>

      {/* user-previous-prompted-projects */}
      <div className="w-full flex flex-col gap-4 p-4">
        <h1 className="font-medium text-[20px] tracking-[-1px]">
          Your Project's
        </h1>
        <div className="w-full flex bg-[#121212] p-4 py-6 rounded-[10px]">
          {/* project-details */}
          <div className="w-full flex flex-col gap-1">
            {/* project-name */}
            <h1 className="font-medium text-[30px] tracking-[-1px]">
              Simple Todo App
            </h1>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco
            </p>
            {/* inital-prompt */}
          </div>
          {/* options */}
          <div className="flex gap-2">
            <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
              <MoveUpRight />
            </div>
            <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
              <Trash />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
