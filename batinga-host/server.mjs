import http from "node:http";
import { readFileSync } from "node:fs";

const UPSTREAM = "https://batinga-vision.lovable.app";
const PORT = Number(process.env.PORT || 10000);
const FINAL_CSS = readFileSync(new URL("./final.css", import.meta.url), "utf8");
const FINAL_JS = readFileSync(new URL("./final.js", import.meta.url), "utf8");

function viewerOnly(html) {
  const patch = "<style id=\"batinga-final-public\">" + FINAL_CSS + "</style>" +
    "<script id=\"batinga-final-runtime\">" + FINAL_JS + "</script>";
  return html.includes("</body>") ? html.replace("</body>", patch + "</body>") : html + patch;
}

function copyHeaders(upstream, res, host) {
  for (const [key, value] of upstream.headers.entries()) {
    const k = key.toLowerCase();
    if ([
      "content-length","content-encoding","transfer-encoding","connection",
      "content-security-policy","content-security-policy-report-only","x-frame-options"
    ].includes(k)) continue;

    if (k === "location") {
      try {
        const u = new URL(value, UPSTREAM);
        if (u.origin === new URL(UPSTREAM).origin) {
          res.setHeader("location", "https://" + host + u.pathname + u.search + u.hash);
          continue;
        }
      } catch {}
    }
    res.setHeader(key, value);
  }
}

http.createServer(async (req, res) => {
  try {
    const incoming = new URL(req.url || "/", "http://local");
    const target = new URL(incoming.pathname + incoming.search, UPSTREAM);

    const headers = new Headers();
    for (const name of ["accept","accept-language","user-agent","if-none-match","if-modified-since","range"]) {
      const v = req.headers[name];
      if (typeof v === "string") headers.set(name, v);
    }
    headers.set("host", new URL(UPSTREAM).host);

    const init = { method: req.method, headers, redirect: "manual" };

    if (!["GET","HEAD"].includes(req.method || "GET")) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      init.body = Buffer.concat(chunks);
    }

    const up = await fetch(target, init);
    res.statusCode = up.status;
    copyHeaders(up, res, req.headers.host || "batinga-vision-view.onrender.com");

    if (req.method === "HEAD") return res.end();

    const type = up.headers.get("content-type") || "";
    if (type.includes("text/html")) {
      const html = viewerOnly(await up.text());
      res.setHeader("content-type", "text/html; charset=utf-8");
      res.setHeader("cache-control", "no-store, max-age=0");
      return res.end(html);
    }

    res.end(Buffer.from(await up.arrayBuffer()));
  } catch (err) {
    console.error("BATINGA proxy error:", err);
    res.statusCode = 502;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("BATINGA indisponível temporariamente.");
  }
}).listen(PORT, "0.0.0.0", () => {
  console.log("BATINGA public presentation online on port", PORT);
});
