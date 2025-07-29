"use client";
import Code from "@/Components/Code";
import Preview from "./Preview";
import React, { useState } from "react";
import { Eye, Code as CodeIcon } from "lucide-react";

const Split = ({ files }: { files: any }) => {
  const [showCode, setShowCode] = useState(true);

  return (
    <div className="flex-1 ml-4 bg-[#121212] rounded-[10px]  flex flex-col gap-2 max-sm:ml-0 relative overflow-hidden h-[700px]">
      {/* Preview/Code Toggle Button */}
      <button
        className="absolute bottom-4 right-4  bg-[#212121] h-[40px] w-[40px] flex justify-center items-center rounded-md text-[#F3F5F7] text-[16px] font-medium tracking-[-0.5px] hover:bg-[#2c2c2c] transition-colors z-10"
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
