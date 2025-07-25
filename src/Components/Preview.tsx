"use client";
import { startDevServer } from "@/Hooks/Container";
import React, { useEffect, useState, useRef } from "react";

const Preview = ({ files }: { files: any }) => {
  const [serverUrl, setServerUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const webContainerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const initializeServer = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Modified startDevServer to return server details
        const serverDetails = await startDevServer(files);

        if (isMounted) {
          setServerUrl(serverDetails.url);
          webContainerRef.current = serverDetails.instance;
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    initializeServer();

    // Cleanup function
    return () => {
      isMounted = false;
      if (webContainerRef.current) {
        // WebContainer doesn't have a direct dispose method,
        // but you can clean up event listeners if needed
        webContainerRef.current = null;
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full rounded-[10px] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Starting development server...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full rounded-[10px] flex items-center justify-center bg-red-50">
        <div className="text-center text-red-600">
          <p className="font-semibold">Failed to start server</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-[10px] overflow-hidden">
      <iframe
        src={serverUrl}
        className="w-full h-full border-0"
        title="Preview"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};

export default Preview;
