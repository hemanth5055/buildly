"use client";
import Code from "@/Components/Code";
import Preview from "./Preview";
import React, { useState } from "react";
import { Eye, Code as CodeIcon } from "lucide-react";

const Split = ({ files }: { files: any }) => {
  const [showCode, setShowCode] = useState(true);

  return (
    <div className="flex-1 ml-4  rounded-[10px]  flex flex-col gap-2 max-sm:ml-0 relative overflow-hidden h-[700px]">
      {/* Preview/Code Toggle Button */}
      <button
        className="absolute top-2 right-4 bg-[#d7d7d7] text-black dark:bg-[#212121] dark:text-[#F3F5F7] h-[40px] w-[40px] flex justify-center items-center rounded-md  text-[16px] font-medium tracking-[-0.5px] transition-colors z-10"
        onClick={() => setShowCode((prev) => !prev)}
      >
        {showCode ? <Eye size={18} /> : <CodeIcon size={18} />}
      </button>

      <div className="w-full flex-1 overflow-hidden rounded-md">
        <div className={`w-full h-full ${showCode ? "" : "hidden"}`}>
          <Code files={files} />
        </div>
        <div className={`w-full h-full ${showCode ? "hidden" : ""}`}>
          <Preview files={files} />
        </div>
      </div>
    </div>
  );
};

export default Split;
