"use client";
import React, { useEffect, useState } from "react";
import { useWebContainer } from "@/context/WebContainerContext";

const Preview = ({ files }: { files: any }) => {
  const { mountFiles, webContainerRef } = useWebContainer();
  const [loading, setLoading] = useState(true);
  const [serverUrl, setServerUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      try {
        setLoading(true);
        await mountFiles(files);

        if (webContainerRef.current) {
          webContainerRef.current.on("server-ready", (port, url) => {
            if (isMounted) {
              setServerUrl(url);
              setLoading(false);
            }
          });
        }
      } catch (err) {
        console.error("Mounting error:", err);
        setLoading(false);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [files]);

  if (loading || !serverUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <div className="text-gray-300 animate-pulse text-lg">
          Starting server...
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={serverUrl}
      className="w-full h-full"
      sandbox="allow-scripts allow-same-origin allow-forms"
      title="Preview"
    />
  );
};

export default Preview;
