"use client";
import { Trash } from "lucide-react";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Delete = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      const res = await axios.delete(`/api/delete-project/${id}`);
      if (res.data.success) {
        toast.success("File deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete project");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="w-[40px] h-[40px] flex rounded-full items-center justify-center cursor-pointer hover:bg-red-600 transition"
      onClick={handleDelete}
      title="Delete Project"
    >
      <Trash />
    </div>
  );
};

export default Delete;
