import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript" };
createServer(async (req, res) => {
  try {
    const path = req.url === "/" ? "/index.html" : decodeURIComponent(req.url.split("?")[0]);
    const data = await readFile(join(process.cwd(), path));
    res.writeHead(200, { "content-type": types[extname(path)] || "application/octet-stream" });
    res.end(data);
  } catch { res.writeHead(404); res.end("Not found"); }
}).listen(4173, () => console.log("http://localhost:4173"));
