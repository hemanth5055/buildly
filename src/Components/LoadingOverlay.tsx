"use client";
import React, { useEffect, useState } from "react";

const loadingMessages = [
  "Generating layout...",
  "Designing components...",
  "Applying styles...",
  "Building sections...",
  "Finalizing structure...",
];

const LoadingOverlay = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] bg-opacity-90 backdrop-blur-sm flex flex-col items-center justify-center text-white font-medium">
      {/* Spinner */}
      <div className="w-12 h-12 mb-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>

      {/* Dynamic loading text */}
      <div className="text-lg sm:text-xl text-center animate-pulse">
        {loadingMessages[index]}
      </div>
    </div>
  );
};

export default LoadingOverlay;
