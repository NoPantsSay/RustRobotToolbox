import { downloadDir } from "@tauri-apps/api/path";
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";

export async function importLayout() {
  const downloadsDir = await downloadDir();
  const path = await open({
    defaultPath: downloadsDir,
    filters: [
      {
        name: "json",
        extensions: ["json"],
      },
    ],
  });
  // console.log(path);
  if (path) {
    const str = await readTextFile(path);
    return str;
  }

  return null;
}
