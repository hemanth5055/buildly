import { Braces, Code2, Paintbrush } from "lucide-react";
import React from "react";

const Code = () => {
  return (
    <div className="w-full h-full flex  rounded-xl shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-[25%] h-full p-4 ">
        <h2 className="text-sm font-semibold text-white mb-4">Files</h2>

        {/* File Item */}
        <div className="space-y-2">
          <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#212121] transition">
            <Code2 className="text-white" size={18} />
            <span className="text-sm font-medium text-white">index.html</span>
          </div>
          <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#212121] transition">
            <Paintbrush className="text-white" size={18} />
            <span className="text-sm font-medium text-white">style.css</span>
          </div>
          <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#212121] transition">
            <Braces className="text-white" size={18} />
            <span className="text-sm font-medium text-white">main.js</span>
          </div>
        </div>
      </div>

      {/* File Viewer Area */}
      <div className="w-[75%] h-full p-6 ">
        {/* You can place your code editor / content here */}
        <pre className="whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-[90%] outline-none">
          <code>
            {`// You can place your code editor / content here
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");

// Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
// vitae dolorum autem repellat nostrum repellendus natus rerum...`}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Code;
