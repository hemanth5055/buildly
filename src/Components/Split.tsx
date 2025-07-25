"use client";
import Code from "@/Components/Code";
import Preview from "./Preview";
import React, { useState } from "react";

const Split = ({ files }: { files: any }) => {
  const [showCode, setShowCode] = useState(true);

  return (
    <div className="flex-1 ml-4 bg-[#121212] rounded-[10px] p-4 flex flex-col gap-2">
      {/* Toggle Button */}
      <button
        className="self-start bg-[#212121] py-1 px-4 rounded-md text-[#F3F5F7] text-[16px] font-medium tracking-[-0.5px] hover:bg-[#2c2c2c] transition-colors"
        onClick={() => setShowCode((prev) => !prev)}
      >
        {showCode ? "Preview" : "Code"}
      </button>

      {/* Content Area */}
      <div className="w-full h-full overflow-auto">
        {showCode ? <Code files={files} /> : <Preview files={files} />}
      </div>
    </div>
  );
};

export default Split;
