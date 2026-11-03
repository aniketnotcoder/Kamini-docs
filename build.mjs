import { cp, mkdir, rm } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("index.html", "dist/index.html");
await cp("assets", "dist/assets", { recursive: true });
await cp("openapi", "dist/openapi", { recursive: true });
console.log("Built Kamini API docs → dist/");
