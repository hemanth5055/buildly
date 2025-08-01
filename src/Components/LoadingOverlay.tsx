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
    }, 20000); // 20 seconds delay
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm flex flex-col items-center justify-center font-medium transition-colors duration-300">
      {/* Spinner */}
      <div className="w-12 h-12 mb-6 border-4 border-t-transparent border-blue-400  rounded-full animate-spin"></div>

      {/* Dynamic loading text */}
      <div className="text-lg sm:text-xl text-gray-800 dark:text-white text-center animate-pulse transition-colors duration-300">
        {loadingMessages[index]}
      </div>
    </div>
  );
};

export default LoadingOverlay;
