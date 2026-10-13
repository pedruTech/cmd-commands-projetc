(() => {
  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>Array.from(r.querySelectorAll(s));

  const removeLovableChrome=()=>{
    qa("a,button,div,aside,section").forEach(el=>{
      const text=(el.textContent||"").trim().toLowerCase();
      const href=el instanceof HTMLAnchorElement?(el.href||"").toLowerCase():"";
      const attrs=Array.from(el.attributes||[]).map(a=>a.name+"="+a.value).join(" ").toLowerCase();
      const cls=((el.id||"")+" "+(typeof el.className==="string"?el.className:"")).toLowerCase();
      const bad=href.includes("lovable.dev") ||
        (href.includes("lovable.app") && text.includes("edit")) ||
        text==="edit with lovable" || text==="editar com lovable" || text==="made with lovable" ||
        cls.includes("lovable-badge") || cls.includes("lovable-edit") ||
        attrs.includes("data-lovable-badge") || attrs.includes("data-lovable-edit");
      if(!bad)return;
      const target=el.closest("a,button")||el;
      const p=target.parentElement;
      if(p && getComputedStyle(p).position==="fixed" && p.children.length<=3)p.remove();
      else target.remove();
    });
  };

  const audienceHTML=()=>[
    '<section class="batinga-audience" id="publico" aria-labelledby="audience-title">',
      '<div class="container audience-wrap">',
        '<div class="audience-kicker" aria-hidden="true"></div>',
        '<div class="audience-intro">',
          '<h2 id="audience-title">Feita para quem precisa <span>coordenar mais do que uma tarefa.</span></h2>',
          '<p>A BATINGA não é definida por um único setor. Ela foi concebida para atravessar operações, profissões e rotinas diferentes sempre que contexto, conhecimento, atendimento, criação e execução precisam trabalhar juntos.</p>',
        '</div>',
        '<div class="audience-groups">',
          '<article class="audience-row"><span class="audience-index">01</span><h3>Empresas e equipes</h3><p>Organizações que precisam conectar processos, pessoas, projetos, pesquisa, atendimento e acompanhamento operacional em uma mesma lógica de trabalho.</p></article>',
          '<article class="audience-row"><span class="audience-index">02</span><h3>Comércio, varejo, restaurantes e delivery</h3><p>Operações com alto volume de decisões, relacionamento com clientes, divulgação e rotinas que exigem resposta rápida sem perder contexto.</p></article>',
          '<article class="audience-row"><span class="audience-index">03</span><h3>Microempreendedores e profissionais autônomos</h3><p>Quem precisa operar com padrão profissional mesmo em estruturas enxutas: vender, atender, organizar clientes, produzir materiais e acompanhar o que precisa acontecer.</p></article>',
          '<article class="audience-row"><span class="audience-index">04</span><h3>Vendedores e operações comerciais</h3><p>Profissionais que dependem de prospecção, histórico de conversas, leads, propostas, follow-ups e continuidade entre relacionamento e execução.</p></article>',
          '<article class="audience-row"><span class="audience-index">05</span><h3>Criadores, influenciadores e streamers</h3><p>Quem transforma pesquisa, ideias e presença digital em conteúdo e precisa organizar pauta, produção, materiais, oportunidades e relacionamento com audiência ou parceiros.</p></article>',
          '<article class="audience-row"><span class="audience-index">06</span><h3>Professores, alunos e pesquisadores</h3><p>Rotinas de estudo e ensino que envolvem investigação, apresentações, documentos, síntese, planejamento e produção de conhecimento com continuidade.</p></article>',
          '<article class="audience-row"><span class="audience-index">07</span><h3>Tecnologia, produto e desenvolvimento</h3><p>Times e profissionais que precisam transformar requisitos em projetos, sistemas, documentação, validação e operação sem separar completamente raciocínio e execução.</p></article>',
          '<article class="audience-row"><span class="audience-index">08</span><h3>Serviços, consultoria e operações de campo</h3><p>Negócios que coordenam clientes, ordens, diagnósticos, agendas, evidências e entregas e precisam preservar o contexto entre cada etapa.</p></article>',
          '<article class="audience-row"><span class="audience-index">09</span><h3>Marketing, atendimento e gestão</h3><p>Operações que lidam simultaneamente com comunicação, clientes, conteúdo, planejamento, prioridades e acompanhamento de execução.</p></article>',
          '<article class="audience-row"><span class="audience-index">10</span><h3>Pessoas com rotinas complexas</h3><p>Qualquer pessoa cuja necessidade já ultrapassou um simples chatbot e exige memória, pesquisa, organização, ferramentas, verificação e responsabilidade sobre o que acontece depois da resposta.</p></article>',
        '</div>',
        '<div class="audience-close">',
          '<strong>O público é amplo. O critério é simples: a BATINGA começa a fazer sentido quando <span style="color:var(--muted-foreground)">responder já não é suficiente.</span></strong>',
          '<p>As capacidades efetivamente disponíveis variam conforme permissões, integrações e configuração de cada ambiente.</p>',
        '</div>',
      '</div>',
    '</section>'
  ].join("");

  const ensureAudience=()=>{
    let section=q("#publico");
    if(section)return section;
    const platform=q("#plataforma");
    const vision=q("#visao");
    if(!platform && !vision)return null;
    const holder=document.createElement("div");
    holder.innerHTML=audienceHTML();
    section=holder.firstElementChild;
    if(platform)platform.parentNode.insertBefore(section,platform);
    else vision.parentNode.insertBefore(section,vision.nextSibling);
    return section;
  };

  const ensureNav=()=>{
    const nav=q(".header-nav");
    if(!nav)return;
    let a=q('a[href="#publico"]',nav);
    if(!a){
      a=document.createElement("a");
      a.href="#publico";
      a.textContent="Para quem";
      const platform=q('a[href="#plataforma"]',nav);
      if(platform)nav.insertBefore(a,platform);
      else nav.appendChild(a);
    }
  };

  const refineCopy=()=>{
    const desc=q(".hero-description");
    if(desc)desc.textContent="A BATINGA reúne inteligência, pesquisa, memória, CRM, atendimento, criação e execução em um mesmo ambiente — para compreender contexto, coordenar decisões e acompanhar o que acontece depois.";
    const foot=q(".hero-footnote");
    if(foot)foot.textContent="Contexto, controle e continuidade.";
    const manifesto=q(".manifesto blockquote");
    if(manifesto)manifesto.innerHTML='BATINGA é a engenharia de uma inteligência que transforma intenção em realidade <span>— compreendendo contexto, conectando conhecimento, executando com controle e verificando cada ação.</span>';
  };

  const activeNav=()=>{
    const links=qa('.header-nav a[href^="#"]');
    const map=new Map(links.map(a=>[a.getAttribute("href").slice(1),a]));
    const sections=Array.from(map.keys()).map(id=>document.getElementById(id)).filter(Boolean);
    if(!("IntersectionObserver" in window)||!sections.length)return;
    const obs=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible)return;
      links.forEach(a=>a.classList.remove("is-active"));
      map.get(visible.target.id)?.classList.add("is-active");
    },{rootMargin:"-28% 0px -58% 0px",threshold:[0,.15,.3,.6]});
    sections.forEach(s=>obs.observe(s));
  };

  const enhanceDocument=()=>{
    removeLovableChrome();
    ensureAudience();
    ensureNav();
    refineCopy();
    activeNav();
  };

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",()=>{
      requestAnimationFrame(()=>requestAnimationFrame(enhanceDocument));
      setTimeout(enhanceDocument,800);
      setTimeout(enhanceDocument,2200);
    });
  }else{
    requestAnimationFrame(()=>requestAnimationFrame(enhanceDocument));
    setTimeout(enhanceDocument,800);
  }

  const observer=new MutationObserver(()=>{
    removeLovableChrome();
    ensureAudience();
    ensureNav();
  });
  observer.observe(document.documentElement,{subtree:true,childList:true});
})();