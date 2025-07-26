"use client";
import { WebContainer } from "@webcontainer/api";
import React, { createContext, useContext, useRef, useState } from "react";

type WebContainerContextType = {
  webContainerRef: React.RefObject<WebContainer | null>;
  mountFiles: (files: any) => Promise<void>;
};

const WebContainerContext = createContext<WebContainerContextType | null>(null);

export const WebContainerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const webContainerRef = useRef<WebContainer | null>(null);
  const [isBooted, setIsBooted] = useState(false);

  const mountFiles = async (files: any) => {
    if (!isBooted) {
      webContainerRef.current = await WebContainer.boot();
      setIsBooted(true);
    }

    if (!webContainerRef.current) return;

    await webContainerRef.current.mount(files);

    const installProcess = await webContainerRef.current.spawn("npm", [
      "install",
    ]);
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log("[npm install]:", data);
        },
      })
    );
    if ((await installProcess.exit) !== 0) {
      throw new Error("npm install failed");
    }

    await webContainerRef.current.spawn("npm", ["run", "start"]);
  };

  return (
    <WebContainerContext.Provider value={{ webContainerRef, mountFiles }}>
      {children}
    </WebContainerContext.Provider>
  );
};

export const useWebContainer = () => {
  const context = useContext(WebContainerContext);
  if (!context)
    throw new Error("useWebContainer must be used within WebContainerProvider");
  return context;
};
