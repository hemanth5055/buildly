"use client";

import { File } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import React, { useState, useEffect } from "react";

interface FileStructure {
  [fileName: string]: {
    file: {
      contents: string;
    };
  };
}

const Code = ({ files }: { files: FileStructure }) => {
  const fileEntries = Object.entries(files);
  const [selectedFile, setSelectedFile] = useState<string>(fileEntries[0][0]);
  const [code, setCode] = useState<string>(fileEntries[0][1].file.contents);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Detect system theme preference
  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(match.matches);

    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    match.addEventListener("change", listener);
    return () => match.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (selectedFile && files[selectedFile]) {
      setCode(files[selectedFile].file.contents);
    }
  }, [selectedFile, files]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-md">
      {/* File Tabs */}
      <div className="w-full bg-[#f0f0f0] text-black dark:bg-[#0f0f0f] dark:text-white p-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2">
          {fileEntries.map(([fileName]) => (
            <div
              key={fileName}
              className={`text-sm whitespace-nowrap cursor-pointer px-3 py-2 rounded-md flex items-center gap-2 transition-all ${
                selectedFile === fileName
                  ? "dark:bg-[#1c1c1c] bg-[#d7d7d7]"
                  : ""
              }`}
              onClick={() => setSelectedFile(fileName)}
            >
              <File size={16} className="text-gray-500" />
              <span>{fileName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Viewer */}
      <div className="flex-1 w-full h-full dark:bg-[#101010] bg-[#f0f0f0] p-4 overflow-auto rounded-b-md scrollbar-hide">
        <SyntaxHighlighter
          language={selectedFile.split(".").pop()}
          style={isDarkMode ? vscDarkPlus : oneLight}
          showLineNumbers
          customStyle={{
            background: "transparent",
            padding: 0,
            height: "100%",
            scrollbarWidth: "none",
          }}
          codeTagProps={{
            style: {
              fontSize: "16px",
              lineHeight: "2",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Code;
