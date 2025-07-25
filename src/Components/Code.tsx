"use client";
import { File } from "lucide-react";
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
    <div className="w-full h-full flex rounded-xl shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-[25%] h-full p-4 bg-[#1a1a1a]">
        <h2 className="text-sm font-semibold text-white mb-4">Files</h2>
        <div className="space-y-2">
          {fileEntries.map(([fileName, fileObj]) => (
            <div
              key={fileName}
              className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                selectedFile === fileName
                  ? "bg-[#212121]"
                  : "hover:bg-[#212121]"
              }`}
              onClick={() => setSelectedFile(fileName)}
            >
              <File className="text-white" size={18} />
              <span className="text-sm font-medium text-white">{fileName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* File Viewer Area */}
      <div className="w-[75%] h-full p-6 bg-[#121212] text-white overflow-auto">
        <pre className="whitespace-pre-wrap leading-relaxed text-sm">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default Code;
