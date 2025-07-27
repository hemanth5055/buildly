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
    <div className="w-full h-full flex bg-black text-white overflow-hidden max-sm:flex-col">
      {/* Sidebar */}
      <div className="w-[25%] h-full bg-[#0f0f0f] p-3 max-sm:w-full max-sm:h-[40%] max-sm:overflow-y-scroll">
        <div className="space-y-1">
          {fileEntries.map(([fileName]) => (
            <div
              key={fileName}
              className={`text-sm cursor-pointer px-3 py-2 rounded-md flex items-center gap-2 transition-all ${
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

      {/* Viewer */}
      <div className="w-[75%] h-full bg-[#101010] p-4 overflow-hidden max-sm:w-full max-sm:h-[70%] max-sm:overflow-scroll">
        <div className="h-full overflow-y-auto overflow-x-auto">
          <SyntaxHighlighter
            language={selectedFile.split(".")[1]}
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              background: "transparent",
              padding: 0,
              height: "100%",
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
    </div>
  );
};

export default Code;
