"use client";
import React, { useState } from "react";
import axios from "axios";
import { addProject } from "@/actions/project.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingOverlay from "./LoadingOverlay";
import { Sparkles, Rocket } from "lucide-react"; // optional icons

const Prompt = ({ credits }: { credits: Number }) => {
  const [prmt, setPrmt] = useState("");
  const [loading, setLoading] = useState(false);
  const [enhanceLoading, setEnhanceloading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (prmt.trim().length === 0) {
      toast("Please enter a prompt.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/create", { prompt: prmt });
      if (data.success) {
        const addingFilestoDb = await addProject(
          data.data.name,
          data.data.reply,
          JSON.stringify(data.data.code),
          prmt
        );
        if (addingFilestoDb.success) {
          toast.success("Project created successfully");
          router.push(`/project/${addingFilestoDb.projectId}`);
        } else {
          toast.error("Failed to save project to database.");
        }
      } else {
        toast.error("Website generation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the project.");
    } finally {
      setLoading(false);
    }
  };

  const handleEnhance = async () => {
    if (!prmt.trim()) {
      toast("Please enter a prompt before enhancing.");
      return;
    }
    setEnhanceloading(true);
    try {
      const { data } = await axios.post("/api/enhance", { prompt: prmt });
      if (data && data.success) {
        toast.success("Prompt enhanced successfully");
        setPrmt(data.enhancedPrompt);
      } else {
        toast.error("Enhancement failed");
      }
    } catch (error) {
      toast.error("Something went wrong while enhancing the prompt.");
    } finally {
      setEnhanceloading(false);
    }
  };

  return (
    <div className="relative w-full  flex flex-col items-center gap-6 mt-24 mb-12 px-4">
      {loading && <LoadingOverlay />}
      <textarea
        name="prompt"
        id="prompt"
        value={prmt}
        onChange={(e) => setPrmt(e.target.value)}
        placeholder="What are you planning to create? (The more detailed you are, the better the result!)"
        className="w-[70%] max-sm:w-[100%] h-[200px] bg-[#121212] rounded-lg p-4 text-white text-base outline-none resize-none border border-[#2A2A2A]  transition"
      />

      <div className="flex gap-4">
        <button
          onClick={handleCreate}
          disabled={credits === 0 || loading}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-white text-base font-medium transition
            ${
              credits === 0 || loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#121212] hover:bg-[#1e1e1e] cursor-pointer"
            }`}
        >
          <Rocket size={18} />
          Create
        </button>

        <button
          onClick={handleEnhance}
          disabled={credits === 0 || enhanceLoading}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-white text-base font-medium transition
            ${
              credits === 0 || enhanceLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#121212] hover:bg-[#1e1e1e] cursor-pointer"
            }`}
        >
          {enhanceLoading ? (
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <>
              <Sparkles size={18} />
              Enhance
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Prompt;
