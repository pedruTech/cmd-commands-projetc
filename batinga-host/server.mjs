import http from "node:http";

const UPSTREAM = "https://batinga-vision.lovable.app";
const PORT = Number(process.env.PORT || 10000);

function viewerOnly(html) {
  const patch = `
<style id="batinga-viewer-only">
/* Lovable editor chrome never appears on the public BATINGA mirror. */
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

/* BATINGA visual refinement — remove common AI-template micro-label language. */
.eyebrow,
.signal-dot,
.hero-coordinate,
.section-divider,
.header-label,
.core-label,
.diagram-caption,
.integration-status,
.portrait-caption,
.founder-signature,
.footer-signature,
.engineering-seal,
.context-chip,
.creation-crosshair,
.feature-topline > span {
  display:none!important;
}

/* Remove decorative clichés that do not add product meaning. */
.portrait-orbit,
.portrait-corner {
  display:none!important;
}

/* Green remains a functional accent, not a decorative text color. */
.workflow-number,
.frontier-index,
.manifesto h2,
.founder-role {
  color:var(--muted-foreground)!important;
}
.manifesto-mark {
  opacity:.42;
}
.feature-topline {
  justify-content:flex-end!important;
  min-height:22px;
}
.feature-topline > svg:first-child {
  display:none!important;
}

/* Editorial spacing after removing micro-labels. */
.section-heading h2,
.creation-heading h3,
.relations-title h3,
.engineering-intro h2,
.founder-copy h2,
.contact-heading h2 {
  margin-top:0!important;
}
.hero h1 {
  margin-top:0!important;
}
.hero-content {
  padding-top:clamp(136px,16vh,188px)!important;
}
@media (max-width:700px){
  .hero-content{padding-top:118px!important}
}

/* Less 'AI dashboard', more authored editorial composition. */
.capability-item,
.creation-item,
.relation-item,
.frontier-row,
.engineering-row {
  border-color:color-mix(in srgb, var(--border) 72%, transparent)!important;
}
.capability-item:hover,
.creation-item:hover,
.relation-item:hover,
.frontier-row:hover {
  transform:none!important;
}
.platform-node {
  border-radius:2px!important;
  box-shadow:none!important;
  background:
    linear-gradient(120deg, color-mix(in srgb,var(--background) 94%,transparent), color-mix(in srgb,var(--card) 82%,transparent))!important;
}
.platform-node:hover,
.platform-node.node-active {
  transform:none!important;
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--primary) 38%,transparent)!important;
}
.platform-core {
  box-shadow:none!important;
  background:radial-gradient(circle at 38% 30%, color-mix(in srgb,var(--primary) 7%,transparent), var(--glass) 62%)!important;
}
.platform-core > span {
  display:none!important;
}

/* Bespoke audience section: editorial ledger, not a card wall. */
.batinga-audience {
  position:relative;
  overflow:hidden;
  padding:clamp(76px,9vw,132px) 0;
  border-top:1px solid var(--border);
  border-bottom:1px solid var(--border);
  background:
    radial-gradient(circle at 86% 18%, color-mix(in srgb,var(--primary) 8%,transparent), transparent 28%),
    linear-gradient(180deg, color-mix(in srgb,var(--card) 24%,transparent), transparent 72%);
}
.batinga-audience::before {
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  opacity:.24;
  background-image:
    linear-gradient(to right, transparent 0, transparent calc(50% - .5px), var(--border) 50%, transparent calc(50% + .5px));
}
.batinga-audience .audience-wrap {
  position:relative;
  z-index:1;
}
.audience-intro {
  display:grid;
  grid-template-columns:1.15fr .85fr;
  gap:clamp(46px,8vw,110px);
  align-items:end;
  margin-bottom:clamp(54px,7vw,88px);
}
.audience-intro h2 {
  margin:0;
  max-width:760px;
  font-size:clamp(38px,5vw,72px);
  font-weight:480;
  line-height:1.02;
  letter-spacing:-.045em;
}
.audience-intro h2 span {
  color:var(--muted-foreground);
}
.audience-intro p {
  margin:0;
  max-width:500px;
  color:var(--muted-foreground);
  font-size:clamp(12px,1.2vw,15px);
  line-height:1.95;
}
.audience-ledger {
  border-top:1px solid var(--border);
}
.audience-row {
  display:grid;
  grid-template-columns:64px minmax(180px,.75fr) minmax(280px,1.65fr);
  gap:clamp(18px,3vw,44px);
  align-items:start;
  padding:26px 0 28px;
  border-bottom:1px solid var(--border);
  transition:padding-left .34s ease,border-color .34s ease,background .34s ease;
}
.audience-row:hover {
  padding-left:14px;
  border-color:color-mix(in srgb,var(--primary) 38%,var(--border));
  background:linear-gradient(90deg,color-mix(in srgb,var(--primary) 3%,transparent),transparent 38%);
}
.audience-index {
  font-size:10px;
  letter-spacing:.16em;
  color:var(--muted-foreground);
}
.audience-row h3 {
  margin:0;
  font-size:clamp(17px,1.7vw,23px);
  font-weight:520;
  letter-spacing:-.02em;
}
.audience-row p {
  margin:0;
  color:var(--muted-foreground);
  font-size:12px;
  line-height:1.85;
  max-width:720px;
}
.audience-close {
  display:grid;
  grid-template-columns:1fr auto;
  gap:32px;
  align-items:end;
  padding-top:44px;
}
.audience-close strong {
  display:block;
  max-width:750px;
  font-size:clamp(22px,2.7vw,38px);
  font-weight:500;
  line-height:1.3;
  letter-spacing:-.03em;
}
.audience-close span {
  color:var(--muted-foreground);
  font-size:11px;
  line-height:1.7;
  max-width:340px;
  text-align:right;
}

@media (max-width:700px){
  .batinga-audience::before{display:none}
  .audience-intro{grid-template-columns:1fr;gap:25px;margin-bottom:44px}
  .audience-intro h2{font-size:39px}
  .audience-row{grid-template-columns:42px 1fr;gap:12px 14px;padding:22px 0}
  .audience-row p{grid-column:2;font-size:11px}
  .audience-row:hover{padding-left:0}
  .audience-close{grid-template-columns:1fr;gap:18px;padding-top:34px}
  .audience-close span{text-align:left}
}

/* Discreet signature line instead of template-like labels. */
.batinga-audience .audience-line {
  width:46px;
  height:1px;
  background:var(--primary);
  margin-bottom:30px;
  opacity:.72;
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

  const audienceMarkup = () => `
    <section class="batinga-audience" id="publico" aria-labelledby="audience-title">
      <div class="container audience-wrap">
        <div class="audience-line" aria-hidden="true"></div>
        <div class="audience-intro">
          <h2 id="audience-title">Tecnologia para quem precisa <span>operar melhor.</span></h2>
          <p>A BATINGA foi pensada para contextos em que informação, comunicação, criação e execução precisam deixar de viver separadas. O ponto em comum não é o setor: é a necessidade de transformar rotina em operação mais clara, conectada e controlável.</p>
        </div>
        <div class="audience-ledger">
          <article class="audience-row"><span class="audience-index">01</span><h3>Empresas e equipes</h3><p>Operações que precisam centralizar contexto, processos, atendimento, projetos, pesquisa e acompanhamento sem depender de dezenas de fluxos desconectados.</p></article>
          <article class="audience-row"><span class="audience-index">02</span><h3>Comércio, restaurantes e delivery</h3><p>Negócios com ritmo alto de atendimento, divulgação, relacionamento com clientes e decisões diárias — onde organização e velocidade fazem diferença na operação.</p></article>
          <article class="audience-row"><span class="audience-index">03</span><h3>Microempreendedores e prestadores de serviço</h3><p>Quem precisa vender, atender, produzir conteúdo, organizar clientes e executar tarefas com estrutura profissional, mesmo operando com uma equipe pequena.</p></article>
          <article class="audience-row"><span class="audience-index">04</span><h3>Vendas e relacionamento comercial</h3><p>Profissionais e equipes que trabalham com prospecção, leads, propostas, histórico de conversas, follow-ups e continuidade de relacionamento.</p></article>
          <article class="audience-row"><span class="audience-index">05</span><h3>Criadores, influenciadores e streamers</h3><p>Pessoas que transformam ideias em conteúdo e precisam organizar pesquisa, pauta, produção, presença digital, materiais e relacionamento com audiência ou parceiros.</p></article>
          <article class="audience-row"><span class="audience-index">06</span><h3>Professores, alunos e pesquisadores</h3><p>Quem trabalha com estudo, apresentações, documentos, organização de conhecimento, investigação e produção intelectual com mais continuidade entre uma etapa e outra.</p></article>
          <article class="audience-row"><span class="audience-index">07</span><h3>Profissionais independentes</h3><p>Consultores, técnicos, designers, desenvolvedores e especialistas que precisam combinar conhecimento, produção, atendimento e execução em um mesmo ambiente de trabalho.</p></article>
          <article class="audience-row"><span class="audience-index">08</span><h3>Pessoas com operações complexas</h3><p>Qualquer pessoa cuja rotina já ultrapassou o limite de um simples chatbot e exige memória, pesquisa, organização, ferramentas, acompanhamento e responsabilidade na execução.</p></article>
        </div>
        <div class="audience-close">
          <strong>Não existe um “usuário padrão” da BATINGA. Existe uma necessidade em comum: <span style="color:var(--muted-foreground)">fazer mais sentido antes de fazer mais coisas.</span></strong>
          <span>Uso e capacidades dependem das configurações, permissões e integrações disponíveis em cada ambiente.</span>
        </div>
      </div>
    </section>`;

  const ensureAudience = () => {
    if (document.getElementById("publico")) return;
    const platform = document.getElementById("plataforma");
    if (!platform) return;
    platform.insertAdjacentHTML("beforebegin", audienceMarkup());
  };

  const refineCopy = () => {
    const og = document.querySelector('meta[property="og:description"]');
    if (og) og.setAttribute("content","BATINGA conecta inteligência, contexto e execução em uma experiência de produto construída para operações reais.");

    const nav = document.querySelector(".header-nav");
    if (nav && !nav.querySelector('a[href="#publico"]')) {
      const a = document.createElement("a");
      a.href = "#publico";
      a.textContent = "Para quem";
      nav.appendChild(a);
    }
  };

  const run = () => {
    scrub(document);
    refineCopy();
    ensureAudience();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(() => requestAnimationFrame(run));
    setTimeout(run, 900);
  });
  else {
    requestAnimationFrame(() => requestAnimationFrame(run));
    setTimeout(run, 900);
  }

  new MutationObserver(() => {
    scrub(document);
    ensureAudience();
  }).observe(document.documentElement,{childList:true,subtree:true});
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
