"use client";
import { downloadCodeAsZip } from "@/download";
import { FileDown } from "lucide-react";
import React from "react";

const Download = ({ files }: { files: any }) => {
  return (
    <div
      className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer"
      onClick={() => downloadCodeAsZip(files)}
    >
      <FileDown className="text-black dark:text-white" />
    </div>
  );
};

export default Download;
