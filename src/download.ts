import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadCodeAsZip = async (files: Record<string, any>) => {
  const zip = new JSZip();

  for (const [filename, content] of Object.entries(files)) {
    zip.file(filename, content.file.contents);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "project.zip");
};
