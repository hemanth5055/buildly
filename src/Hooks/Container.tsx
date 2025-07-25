// Hooks/Container.ts
import { WebContainer } from "@webcontainer/api";

let webContainerInstance: any = null;
let serverStarted = false;
let serverUrl: string | null = null;

export async function startDevServer(files: any) {
  // Prevent restarting if already started
  if (serverStarted && webContainerInstance && serverUrl) {
    return { url: serverUrl, instance: webContainerInstance };
  }

  webContainerInstance = await WebContainer.boot();
  await webContainerInstance.mount(files);

  const installProcess = await webContainerInstance.spawn("npm", ["install"]);
  const installExitCode = await installProcess.exit;

  if (installExitCode !== 0) {
    throw new Error("npm install failed");
  }

  const serverProcess = await webContainerInstance.spawn("npm", [
    "run",
    "start",
  ]);

  serverProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log("[Server]:", data);
      },
    })
  );

  // Wait for WebContainer to emit server-ready
  return new Promise((resolve, reject) => {
    webContainerInstance.on("server-ready", (port: number, url: string) => {
      serverStarted = true;
      serverUrl = url;
      resolve({ url, instance: webContainerInstance });
    });
  });
}
