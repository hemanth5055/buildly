import { FileDown, PanelRight } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="w-full flex flex-col h-screen">
      {/* navbar */}
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="font-medium text-[30px] text-black dark:text-[#F3F5F7] tracking-[-1.2px]">
          Simple Todo APP
        </h1>
        <div className="flex gap-2 items-center">
          <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
            <PanelRight />
          </div>
          <div className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer">
            <FileDown />
          </div>
        </div>
      </div>

      {/* chat-code-preview-area */}
      <div className="w-full flex flex-1 overflow-hidden px-4 pb-4">
        {/* chat */}
        <div className="w-[30%] p-4 bg-gray-100 rounded-[10px] flex flex-col h-full">
          {/* chat body */}
          <div className="flex-1 flex flex-col overflow-y-auto space-y-2 pr-2">
            <div className="w-full flex justify-end">
              <div className="w-[70%] flex justify-end items-center">
                <p className="block text-right">
                  Lorem ipsum is placeholder text commonly used in the graphic
                </p>
              </div>
            </div>
          </div>
          {/* chat input */}
          <div className="w-full h-[50px] bg-amber-600 mt-2 rounded-md"></div>
        </div>

        {/* code-preview */}
        <div className="flex-1 ml-4 bg-gray-100 rounded-[10px] p-4 flex flex-col">
          {/* Toggle button at top */}
          <div className="w-full flex">
            <div className="bg-[#ffffff] py-1 px-3 rounded-[5px]">
              <h1 className="font-medium text-[20px] text-black dark:text-[#F3F5F7]  tracking-[-1px]">
                Code
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
