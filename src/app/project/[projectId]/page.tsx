import Code from "@/Components/Code";
import Preview from "@/Components/Preview";
import Split from "@/Components/Split";
import { FileDown, PanelRight } from "lucide-react";
import React from "react";

const page = () => {
  //respone should be retrieved from database
  const files = {
    "package.json": {
      file: {
        contents: `
{
  "name": "vanilla-static-app",
  "version": "1.0.0",
  "scripts": {
    "start": "serve -l 3000"
  },
  "devDependencies": {
    "serve": "^14.2.0"
  }
}
    `,
      },
    },
    "index.html": {
      file: {
        contents:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Simple To-Do App</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <div class="container">\n        <h1>To-Do List</h1>\n        <input type="text" id="newTask" placeholder="Add new task...">\n        <button id="addTask">Add Task</button>\n        <ul id="taskList"></ul>\n    </div>\n    <script src="script.js"></script>\n</body>\n</html>',
      },
    },
    "style.css": {
      file: {
        contents:
          'body {\n        background-color: #222;\n        color: #eee;\n        font-family: sans-serif;\n    }\n    .container {\n        width: 500px;\n        margin: 50px auto;\n        padding: 20px;\n        background-color: #333;\n        border-radius: 5px;\n    }\n    h1 {\n        text-align: center;\n        margin-bottom: 20px;\n    }\n    input[type="text"] {\n        width: 100%;\n        padding: 10px;\n        margin-bottom: 10px;\n        background-color: #444;\n        color: #eee;\n        border: none;\n        border-radius: 5px;\n    }\n    button {\n        background-color: #5cb85c;\n        color: white;\n        padding: 10px 20px;\n        border: none;\n        border-radius: 5px;\n        cursor: pointer;\n    }\n    ul {\n        list-style: none;\n        padding: 0;\n    }\n    li {\n        background-color: #444;\n        padding: 10px;\n        margin-bottom: 5px;\n        border-radius: 5px;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n    }\n    li span{\n        flex-grow: 1;\n\n    }\n    li button {\n        background-color: #d9534f;\n    }\n    ',
      },
    },
    "script.js": {
      file: {
        contents:
          "const newTaskInput = document.getElementById('newTask');\nconst addTaskButton = document.getElementById('addTask');\nconst taskList = document.getElementById('taskList');\n\naddTaskButton.addEventListener('click', addTask);\n\nfunction addTask() {\n    const taskText = newTaskInput.value.trim();\n    if (taskText === '') return;\n\n    const newTaskItem = document.createElement('li');\n    newTaskItem.innerHTML = `<span>${taskText}</span> <button onclick=\"deleteTask(this)\">Delete</button>`;\n    taskList.appendChild(newTaskItem);\n    newTaskInput.value = '';\n}\n\nfunction deleteTask(button) {\n    const listItem = button.parentNode;\n    taskList.removeChild(listItem);\n}",
      },
    },
  };
  return (
    <div className="w-full flex flex-col h-screen">
      {/* navbar */}
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="font-medium text-[30px] text-black dark:text-[#F3F5F7] tracking-[-1.2px]">
          Simple Todo App
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
        <div className="w-[30%] p-4 bg-[#121212] rounded-[10px] flex flex-col h-full">
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
        <Split files={files}></Split>
      </div>
    </div>
  );
};

export default page;
