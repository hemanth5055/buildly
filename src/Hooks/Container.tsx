import { WebContainer } from "@webcontainer/api";

export async function startDevServer(files: any) {
  const webContainerInstance = await WebContainer.boot();
  await webContainerInstance.mount(files);

  const installProcess = await webContainerInstance.spawn("npm", ["install"]);
  const installExitCode = await installProcess.exit;
  if (installExitCode !== 0) {
    throw new Error("npm install failed");
  }

  const serverProcess = await webContainerInstance.spawn("npm", ["run", "start"]);
  serverProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log("[Server]:", data);
      },
    })
  );

  return new Promise<{ url: string; instance: typeof webContainerInstance }>(
    (resolve, reject) => {
      webContainerInstance.on("server-ready", (port, url) => {
        console.log("WebContainer server started at:", url);
        resolve({
          url,
          instance: webContainerInstance,
        });
      });

      // Optional timeout to fail gracefully
      setTimeout(() => {
        reject(new Error("WebContainer server did not start in time"));
      }, 10000);
    }
  );
}
