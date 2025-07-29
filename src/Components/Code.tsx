"use client";
import { File } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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

  useEffect(() => {
    if (selectedFile && files[selectedFile]) {
      setCode(files[selectedFile].file.contents);
    }
  }, [selectedFile, files]);

  return (
    <div className="w-full h-full flex flex-col bg-black text-white overflow-hidden rounded-md">
      {/* File list at the top */}
      <div className="w-full bg-[#0f0f0f] p-2 overflow-x-auto scrollbar-hide border-b border-neutral-800">
        <div className="flex gap-2">
          {fileEntries.map(([fileName]) => (
            <div
              key={fileName}
              className={`text-sm whitespace-nowrap cursor-pointer px-3 py-2 rounded-md flex items-center gap-2 transition-all ${
                selectedFile === fileName
                  ? "bg-[#1c1c1c] text-white"
                  : "text-gray-400 hover:bg-[#1a1a1a]"
              }`}
              onClick={() => setSelectedFile(fileName)}
            >
              <File size={16} className="text-gray-400" />
              <span>{fileName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Viewer */}
      <div className="flex-1 w-full h-full bg-[#101010] p-4 overflow-auto rounded-b-md scrollbar-hide">
        <SyntaxHighlighter
          language={selectedFile.split(".").pop()}
          style={vscDarkPlus}
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
