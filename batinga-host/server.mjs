import http from "node:http";

const UPSTREAM = "https://batinga-vision.lovable.app";
const PORT = Number(process.env.PORT || 10000);

function viewerOnly(html) {
  const patch = `
<style id="batinga-viewer-only">
a[href*="lovable.dev"],
a[href*="lovable.app"][aria-label*="edit" i],
[data-lovable-badge],
[data-lovable-edit],
#lovable-badge,
.lovable-badge,
.lovable-edit-button {
  display:none!important;
  visibility:hidden!important;
  pointer-events:none!important;
  width:0!important;
  height:0!important;
  overflow:hidden!important;
}
</style>
<script>
(() => {
  const isEdit = el => {
    if (!(el instanceof Element)) return false;
    const txt = (el.textContent || "").trim().toLowerCase();
    const href = el instanceof HTMLAnchorElement ? (el.href || "").toLowerCase() : "";
    const attrs = Array.from(el.attributes || []).map(a => a.name+"="+a.value).join(" ").toLowerCase();
    const cls = ((el.id||"")+" "+(typeof el.className==="string"?el.className:"")).toLowerCase();
    return href.includes("lovable.dev") ||
      (href.includes("lovable.app") && txt.includes("edit")) ||
      txt === "edit with lovable" ||
      txt === "editar com lovable" ||
      txt === "made with lovable" ||
      cls.includes("lovable-badge") ||
      cls.includes("lovable-edit") ||
      attrs.includes("data-lovable-badge") ||
      attrs.includes("data-lovable-edit");
  };

  const scrub = root => {
    const nodes = root.querySelectorAll ? root.querySelectorAll("a,button,div,aside,section") : [];
    for (const el of nodes) {
      if (!isEdit(el)) continue;
      const target = el.closest("a,button") || el;
      const p = target.parentElement;
      if (p && getComputedStyle(p).position === "fixed" && p.children.length <= 3) p.remove();
      else target.remove();
    }
  };

  const run = () => scrub(document);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();

  new MutationObserver(() => scrub(document)).observe(document.documentElement,{childList:true,subtree:true});
})();
</script>`;
  return html.includes("</body>") ? html.replace("</body>", patch + "</body>") : html + patch;
}

function copyHeaders(upstream, res, host) {
  for (const [key, value] of upstream.headers.entries()) {
    const k = key.toLowerCase();
    if (["content-length","content-encoding","transfer-encoding","connection","content-security-policy","content-security-policy-report-only","x-frame-options"].includes(k)) continue;
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

http.createServer(async (req,res) => {
  try {
    const incoming = new URL(req.url || "/", "http://local");
    const target = new URL(incoming.pathname + incoming.search, UPSTREAM);

    const headers = new Headers();
    for (const name of ["accept","accept-language","user-agent","if-none-match","if-modified-since","range"]) {
      const v = req.headers[name];
      if (typeof v === "string") headers.set(name, v);
    }
    headers.set("host", new URL(UPSTREAM).host);

    const init = {method:req.method,headers,redirect:"manual"};
    if (!["GET","HEAD"].includes(req.method || "GET")) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      init.body = Buffer.concat(chunks);
    }

    const up = await fetch(target, init);
    res.statusCode = up.status;
    copyHeaders(up,res,req.headers.host || "batinga-view.onrender.com");

    if (req.method === "HEAD") return res.end();

    const type = up.headers.get("content-type") || "";
    if (type.includes("text/html")) {
      const html = viewerOnly(await up.text());
      res.setHeader("content-type", type || "text/html; charset=utf-8");
      res.setHeader("cache-control","no-cache");
      return res.end(html);
    }

    res.end(Buffer.from(await up.arrayBuffer()));
  } catch (err) {
    console.error(err);
    res.statusCode = 502;
    res.setHeader("content-type","text/plain; charset=utf-8");
    res.end("BATINGA indisponível temporariamente.");
  }
}).listen(PORT,"0.0.0.0",()=>console.log("BATINGA viewer-only online",PORT));
