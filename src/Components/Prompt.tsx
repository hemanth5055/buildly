"use client";
import React, { useState } from "react";
import axios from "axios";
import { addProject } from "@/actions/project.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Prompt = ({ credits }: { credits: Number }) => {
  const [prmt, setPrmt] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (prmt.trim().length === 0) return;
    setLoading(true);
    try {
      const { data } = await axios.post("/api/create", { prompt: prmt });
      console.log("API Response:", data);
      if (data.success) {
        //add this data to database and redirect to /projectId
        const addingFilestoDb = await addProject(
          data.data.name,
          data.data.reply,
          JSON.stringify(data.data.code),
          prmt
        );
        if (addingFilestoDb.success) {
          toast.success("Project created Succesfully");
          router.push(`/project/${addingFilestoDb.projectId}`);
        } else {
          toast.error("Unable to create website !");
        }
      } else {
        toast.error("Unable to create website !");
      }
      // optionally clear prompt or redirect
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Unable to create website !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col gap-4 items-center mt-[100px] mb-[30px]">
      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex items-center gap-2 text-white text-lg">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Generating...
          </div>
        </div>
      )}

      <textarea
        name="prompt"
        id="prompt"
        value={prmt}
        onChange={(e) => setPrmt(e.target.value)}
        className="w-[60%] h-[200px] rounded-[10px] bg-[#121212] outline-none p-4 text-[20px] resize-none text-white"
        placeholder="What are you planning to create?"
      ></textarea>

      <button
        className={`px-4 py-2 rounded-[5px] text-white transition 
    ${
      credits === 0 || loading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-[#121212] cursor-pointer"
    }`}
        onClick={handleCreate}
        disabled={loading || credits === 0}
      >
        Generate 🚀
      </button>
    </div>
  );
};

export default Prompt;
