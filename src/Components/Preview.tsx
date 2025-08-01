"use client";
import React, { useEffect, useState } from "react";
import { useWebContainer } from "@/context/WebContainerContext";

const Preview = ({ files }: { files: any }) => {
  const { mountFiles, webContainerRef } = useWebContainer();
  const [loading, setLoading] = useState(true);
  const [serverUrl, setServerUrl] = useState<string | null>(null);
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        await mountFiles(files);

        if (webContainerRef.current) {
          webContainerRef.current.on("server-ready", (port, url) => {
            setServerUrl(url);
            setLoading(false);
            setDelayed(false);
          });
        }
      } catch (err) {
        console.error("Mounting error:", err);
        setLoading(false);
      }
    };

    run();

    const timeout = setTimeout(() => {
      if (loading) {
        setDelayed(true);
      }
    }, 30000); //wait for atleast 20sec to mount the files

    return () => {
      clearTimeout(timeout);
    };
  }, [files]);

  if (loading || !serverUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center ">
        <div className="text-gray-500  animate-pulse text-lg text-center px-4">
          {delayed ? "Don't worry first boot takes little longer." : "Starting server..."}
        </div>
      </div>
    );
  }

  return (
    <iframe
      src={serverUrl}
      className="w-full rounded-[10px] h-full"
      sandbox="allow-scripts allow-same-origin allow-forms"
      title="Preview"
    />
  );
};

export default Preview;
