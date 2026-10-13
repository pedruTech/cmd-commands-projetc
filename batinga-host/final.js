(() => {
  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const setText=(selector,text)=>{const el=q(selector);if(el)el.textContent=text;};
  const setHTML=(selector,html)=>{const el=q(selector);if(el)el.innerHTML=html;};
  const setLeadText=(el,text)=>{
    if(!el)return;
    const textNode=Array.from(el.childNodes).find(n=>n.nodeType===Node.TEXT_NODE);
    if(textNode)textNode.nodeValue=text+" ";
    else el.insertBefore(document.createTextNode(text+" "),el.firstChild);
  };

  const removeLovableChrome=()=>{
    qa('a[href*="lovable.dev"],a[href*="lovable.app"][aria-label*="edit" i],[data-lovable-badge],[data-lovable-edit],#lovable-badge,.lovable-badge,.lovable-edit-button').forEach(el=>el.remove());
    qa("a,button").forEach(el=>{
      const text=(el.textContent||"").trim().toLowerCase();
      const href=el instanceof HTMLAnchorElement?(el.href||"").toLowerCase():"";
      if(text==="edit with lovable"||text==="editar com lovable"||text==="made with lovable"||href.includes("lovable.dev")){
        const p=el.parentElement;
        if(p&&getComputedStyle(p).position==="fixed"&&p.children.length<=3)p.remove();
        else el.remove();
      }
    });
  };

  const audienceHTML=()=>[
    '<section class="batinga-audience" id="publico" aria-labelledby="audience-title">',
      '<div class="container audience-wrap">',
        '<div class="audience-intro">',
          '<h2 id="audience-title">Para organizações, profissionais e pessoas que precisam <span>fazer o trabalho avançar.</span></h2>',
          '<p>A BATINGA não foi desenhada para um setor específico. Ela faz sentido sempre que contexto, conhecimento, comunicação, criação e execução precisam deixar de operar separados.</p>',
        '</div>',
        '<div class="audience-groups">',
          '<article class="audience-row"><h3>Empresas e equipes</h3><p>Para conectar processos, projetos, pesquisa, atendimento, decisões e acompanhamento operacional em uma mesma lógica de trabalho.</p></article>',
          '<article class="audience-row"><h3>Comércio, varejo, restaurantes e delivery</h3><p>Para rotinas intensas de atendimento, divulgação, relacionamento com clientes, prioridades e decisões que não podem perder contexto.</p></article>',
          '<article class="audience-row"><h3>Microempreendedores e autônomos</h3><p>Para vender, atender, organizar clientes, produzir materiais e operar com estrutura profissional mesmo em equipes pequenas.</p></article>',
          '<article class="audience-row"><h3>Vendas e operações comerciais</h3><p>Para organizar leads, histórico de conversas, propostas, follow-ups, oportunidades e continuidade entre relacionamento e execução.</p></article>',
          '<article class="audience-row"><h3>Criadores, influenciadores e streamers</h3><p>Para transformar pesquisa e ideias em conteúdo, organizar produção, materiais, oportunidades e relacionamento com audiência ou parceiros.</p></article>',
          '<article class="audience-row"><h3>Professores, alunos e pesquisadores</h3><p>Para investigar, sintetizar, estruturar documentos, apresentações, estudos e produção de conhecimento com continuidade.</p></article>',
          '<article class="audience-row"><h3>Tecnologia, produto e desenvolvimento</h3><p>Para transformar requisitos em projetos, sistemas, documentação, validação e evolução contínua do produto.</p></article>',
          '<article class="audience-row"><h3>Serviços, consultoria e operações de campo</h3><p>Para coordenar clientes, agendas, ordens, diagnósticos, evidências, entregas e o contexto entre cada etapa.</p></article>',
          '<article class="audience-row"><h3>Marketing, atendimento e gestão</h3><p>Para coordenar comunicação, conteúdo, clientes, planejamento, prioridades e acompanhamento do que precisa acontecer.</p></article>',
          '<article class="audience-row"><h3>Pessoas e projetos pessoais</h3><p>Para quem precisa ir além de uma resposta isolada e quer organizar contexto, pesquisa, documentos, decisões e próximos passos em um mesmo fluxo.</p></article>',
        '</div>',
        '<div class="audience-close">',
          '<strong>O público é amplo porque o problema é amplo: <span style="color:var(--muted-foreground)">informação só cria valor quando consegue virar decisão e execução.</span></strong>',
          '<p>Os recursos efetivamente disponíveis variam conforme permissões, integrações e configuração de cada ambiente.</p>',
        '</div>',
      '</div>',
    '</section>'
  ].join("");

  const ensureAudience=()=>{
    let section=q("#publico");
    if(section)return section;
    const platform=q("#plataforma");
    const vision=q("#visao");
    if(!platform&&!vision)return null;
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

    const wanted=[
      ["#visao","Visão"],
      ["#capacidades","Capacidades"],
      ["#publico","Para quem"],
      ["#plataforma","Plataforma"],
      ["#contato","Contato"]
    ];

    wanted.forEach(([href,label])=>{
      let a=q('a[href="'+href+'"]',nav);
      if(!a){
        a=document.createElement("a");
        a.href=href;
        nav.appendChild(a);
      }
      a.textContent=label;
    });

    qa("a",nav).forEach(a=>{
      const href=a.getAttribute("href");
      if(!wanted.some(([wantedHref])=>wantedHref===href))a.remove();
    });
  };

  const refineMetadata=()=>{
    document.title="BATINGA — Inteligência para transformar contexto em execução";
    const setMeta=(selector,value,attr="content")=>{const el=q(selector);if(el)el.setAttribute(attr,value);};
    setMeta('meta[name="description"]',"BATINGA conecta inteligência, pesquisa, memória, CRM, atendimento, criação e execução em um mesmo ambiente de operação.");
    setMeta('meta[property="og:title"]',"BATINGA — Inteligência em operação");
    setMeta('meta[property="og:description"]',"Uma plataforma para conectar contexto, conhecimento, decisão e execução.");
  };

  const refineHero=()=>{
    setHTML(".hero-tagline",'Inteligência para transformar<br>contexto em <span>execução.</span>');
    setText(".hero-description","A BATINGA reúne pesquisa, memória, CRM, atendimento, criação, projetos e execução em um mesmo ambiente — para compreender o contexto, estruturar decisões e acompanhar o que acontece depois.");
    const actions=qa(".hero-actions a");
    if(actions[0]){setLeadText(actions[0],"Conhecer capacidades");actions[0].setAttribute("href","#capacidades");}
    if(actions[1]){setLeadText(actions[1],"Para quem é");actions[1].setAttribute("href","#publico");}
    const headerCta=q(".header-end a");
    if(headerCta){setLeadText(headerCta,"Falar com a BATINGA");headerCta.setAttribute("href","#contato");}
  };

  const refineVision=()=>{
    setHTML("#vision-title",'Uma camada de inteligência entre intenção e <span>operação.</span>');
    const vision=q("#visao .section-heading>p");
    if(vision)vision.textContent="A BATINGA foi desenhada para conectar informação, ferramentas e decisões em um fluxo contínuo — sem confundir resposta com resultado.";

    const featureTitle=q(".intelligence-feature .feature-copy h3");
    if(featureTitle)featureTitle.textContent="Inteligência com contexto operacional.";
    const featureP=q(".intelligence-feature .feature-copy p");
    if(featureP)featureP.textContent="Pesquisa, memória e contexto trabalham juntos antes de cada ação, preservando continuidade entre a pergunta, a decisão e o próximo passo.";

    const capabilityCopy=[
      ["Pesquisa","Investiga fontes, organiza evidências e amplia o contexto necessário para decidir."],
      ["Memória","Mantém continuidade entre decisões, projetos, pessoas, referências e próximos passos."],
      ["Execução segura","Aplica permissões, aprovações e verificações antes de ações que exigem controle."],
      ["Monitoramento & operação","Acompanha atividades em andamento, falhas, estados e pontos que exigem intervenção."]
    ];
    qa(".capability-item").forEach((item,i)=>{
      if(!capabilityCopy[i])return;
      const [title,text]=capabilityCopy[i];
      const h=q("h3",item),p=q("p",item);
      if(h)h.textContent=title;if(p)p.textContent=text;
    });

    const creationHeading=q(".creation-heading h3");
    if(creationHeading)creationHeading.textContent="Da intenção ao entregável.";
    const creationCopy=[
      ["Design Intelligence","Transforma intenção em direção visual e interfaces guiadas por critérios de produto."],
      ["Software Factory","Planeja, implementa, verifica e evolui sistemas e produtos digitais."],
      ["Artefatos & documentos","Estrutura documentos, planilhas, apresentações e outros entregáveis revisáveis."],
      ["Mídia","Organiza e trabalha com materiais multimodais conforme as capacidades disponíveis."]
    ];
    qa(".creation-item").forEach((item,i)=>{
      if(!creationCopy[i])return;
      const [title,text]=creationCopy[i];
      const h=q("h4",item),p=q("p",item);
      if(h)h.textContent=title;if(p)p.textContent=text;
    });

    const execTitle=q(".execution-band>div:nth-child(2) h3");
    const execP=q(".execution-band>div:nth-child(2) p");
    if(execTitle)execTitle.textContent="Orquestração para tarefas que não terminam em uma única resposta.";
    if(execP)execP.textContent="A BATINGA coordena etapas, preserva contexto e mantém pontos de verificação para que a execução continue sob controle até a revisão do resultado.";
    const computerTitle=q(".computer-use h4"),computerP=q(".computer-use p");
    if(computerTitle)computerTitle.textContent="Navegação web controlada";
    if(computerP)computerP.textContent="Interação com navegador dentro de limites definidos, com supervisão e critérios de segurança.";

    const relTitle=q(".relations-title h3");
    if(relTitle)relTitle.innerHTML='Relacionamento, operação e <span>continuidade.</span>';
    const relationCopy=[
      ["CRM & Leads","Organiza contatos, oportunidades, histórico e contexto comercial."],
      ["Atendimento","Preserva contexto entre conversas, solicitações e rotinas de atendimento."],
      ["Marketing","Conecta planejamento, conteúdo e continuidade operacional de comunicação."]
    ];
    qa(".relation-item").forEach((item,i)=>{
      if(!relationCopy[i])return;
      const [title,text]=relationCopy[i];
      const h=q("h4",item),p=q("p",item);
      if(h)h.textContent=title;if(p)p.textContent=text;
    });
    const integration=q(".official-integration");
    if(integration){
      const h=q("h4",integration),p=q("p",integration);
      if(h)h.textContent="Meta e WhatsApp";
      if(p)p.textContent="A arquitetura está preparada para integrações oficiais. A disponibilidade real depende de credenciais, permissões e configuração do ambiente.";
    }
  };

  const refinePlatform=()=>{
    setHTML("#platform-title",'Uma arquitetura conectada ao <span>trabalho real.</span>');
    const p=q("#plataforma .section-heading>p");
    if(p)p.textContent="Pesquisa, memória, CRM, projetos, atendimento e automação compartilham o mesmo contexto para reduzir rupturas entre pensar, decidir e executar.";

    const modules=[
      ["Pesquisa","Fontes e contexto"],
      ["Memória","Continuidade"],
      ["CRM","Relações e oportunidades"],
      ["Automação","Ações com controle"],
      ["Projetos","Construção e evolução"],
      ["Conteúdo","Materiais e artefatos"],
      ["Atendimento","Conversas em contexto"],
      ["Operação","Coordenação e verificação"]
    ];
    qa(".platform-node").forEach((node,i)=>{
      if(!modules[i])return;
      const [title,detail]=modules[i];
      const strong=q(".node-copy strong",node);
      const small=q(".node-copy>span",node);
      if(strong)strong.textContent=title;
      if(small)small.textContent=detail;
    });
  };

  const refineWorkflow=()=>{
    const section=q(".architecture-section");
    if(!section)return;
    section.id="arquitetura";
    setHTML("#flow-title",'Da intenção à <span>execução verificável.</span>');
    const lead=q(".architecture-section .section-heading>p");
    if(lead)lead.textContent="O valor não está em responder rápido. Está em entender o contexto, escolher o caminho certo, executar com controle e verificar o resultado.";

    const desired=[
      ["Entender","Compreender a intenção, o contexto, as restrições e o que realmente importa."],
      ["Pesquisar","Buscar informação e evidências quando a decisão exige conhecimento adicional."],
      ["Planejar","Definir etapas, critérios, dependências e o caminho adequado para a execução."],
      ["Orquestrar","Coordenar ferramentas, especialistas e tarefas sem perder contexto entre as etapas."],
      ["Executar","Realizar ações autorizadas dentro dos limites, permissões e controles definidos."],
      ["Verificar","Conferir o resultado, identificar desvios e registrar evidências antes de concluir."]
    ];

    const workflow=q(".workflow",section);
    if(workflow){
      workflow.innerHTML=desired.map(([title,text]) =>
        '<article class="workflow-step architecture-step">' +
          '<h3>'+title+'</h3>' +
          '<p>'+text+'</p>' +
        '</article>'
      ).join("");
    }

    const note=q(".workflow-note",section);
    if(note)note.textContent="A execução permanece condicionada a contexto, permissões, aprovações e verificações aplicáveis a cada ação.";
  };

  const refineEngineering=()=>{
    setHTML("#engineering-title",'Capacidades que já fazem parte da <span>base construída.</span>');
    const p=q(".engineering-intro>p");
    if(p)p.textContent="Uma base operacional com contexto, limites e verificação — apresentada aqui sem transformar roadmap em capacidade disponível.";

    const facts=[
      "Pesquisa contextual",
      "Memória e continuidade",
      "Projetos e software",
      "Artefatos e documentos",
      "CRM e atendimento",
      "Marketing e conteúdo",
      "Navegação web controlada",
      "Automação com aprovação",
      "Orquestração de tarefas"
    ];
    qa(".engineering-row").forEach((row,i)=>{
      const h=q("h3",row);
      if(h&&facts[i])h.textContent=facts[i];
    });
    const disclosure=q(".engineering-disclosure");
    if(disclosure)disclosure.textContent="A disponibilidade de cada recurso depende das configurações, permissões e integrações do ambiente.";
  };

  const refineManifesto=()=>{
    setHTML(".manifesto blockquote",'A BATINGA parte de uma ideia simples: inteligência útil não termina na resposta. <span>Ela organiza contexto, sustenta decisões, coordena a execução e verifica o que aconteceu depois.</span>');
    const a=q(".manifesto a");
    if(a){setLeadText(a,"Conhecer a arquitetura");a.setAttribute("href","#arquitetura");}
  };

  const refineFounder=()=>{
    setText(".founder-role","Direção de produto e engenharia");
    setText(".founder-statement","Construir uma inteligência que compreenda o contexto, preserve o controle e consiga acompanhar a execução até o resultado.");
    setText(".founder-description","Pedro Batinga conduz a visão de produto e a evolução técnica do ecossistema BATINGA, conectando arquitetura, experiência e operação em uma mesma direção.");
  };

  const refineContact=()=>{
    const contact=q(".contact-section");
    if(contact)contact.id="contato";
    setHTML("#contact-title",'Vamos entender o que sua operação <span>precisa mover.</span>');
  };

  const refineFooter=()=>{
    const p=q(".footer p");
    if(p)p.textContent="BATINGA — apresentação institucional. A disponibilidade de recursos varia conforme configuração, permissões e integrações.";
  };

  let navObserver=null;
  const setupActiveNav=()=>{
    if(navObserver){navObserver.disconnect();navObserver=null;}
    const links=qa('.header-nav a[href^="#"]');
    const pairs=links.map(a=>[a,document.getElementById((a.getAttribute("href")||"").slice(1))]).filter(([,el])=>el);
    if(!("IntersectionObserver" in window)||!pairs.length)return;
    navObserver=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible)return;
      links.forEach(a=>a.classList.remove("is-active"));
      const match=pairs.find(([,el])=>el===visible.target);
      match?.[0]?.classList.add("is-active");
    },{rootMargin:"-28% 0px -58% 0px",threshold:[0,.12,.3,.55]});
    pairs.forEach(([,el])=>navObserver.observe(el));
  };

  const enhanceDocument=()=>{
    removeLovableChrome();
    ensureAudience();
    ensureNav();
    refineMetadata();
    refineHero();
    refineVision();
    refinePlatform();
    refineWorkflow();
    refineEngineering();
    refineManifesto();
    refineFounder();
    refineContact();
    refineFooter();
    setupActiveNav();
  };

  let scheduled=false;
  const scheduleEnhance=()=>{
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{
      scheduled=false;
      removeLovableChrome();
      ensureAudience();
      ensureNav();
    });
  };

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",()=>{
      requestAnimationFrame(()=>requestAnimationFrame(enhanceDocument));
      setTimeout(enhanceDocument,900);
    },{once:true});
  }else{
    requestAnimationFrame(()=>requestAnimationFrame(enhanceDocument));
    setTimeout(enhanceDocument,900);
  }

  new MutationObserver(scheduleEnhance).observe(document.documentElement,{subtree:true,childList:true});
})();

/* Final premium interaction layer */
(() => {
  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer=window.matchMedia("(pointer:fine)").matches;

  const ensureProgress=()=>{
    if(q(".batinga-scroll-progress"))return q(".batinga-scroll-progress");
    const el=document.createElement("div");
    el.className="batinga-scroll-progress";
    el.setAttribute("aria-hidden","true");
    document.body.appendChild(el);
    return el;
  };

  const setupProgress=()=>{
    const bar=ensureProgress();
    let ticking=false;
    const update=()=>{
      ticking=false;
      const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
      const progress=Math.max(0,Math.min(1,window.scrollY/max));
      bar.style.transform="scaleX("+progress+")";
    };
    const onScroll=()=>{
      if(ticking)return;
      ticking=true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll,{passive:true});
  };

  const setupCursorLight=()=>{
    if(reduce||!finePointer||q(".batinga-cursor-light"))return;
    const glow=document.createElement("div");
    glow.className="batinga-cursor-light";
    glow.setAttribute("aria-hidden","true");
    document.body.appendChild(glow);
    let x=window.innerWidth*.5,y=window.innerHeight*.35,tx=x,ty=y,raf=0;

    const draw=()=>{
      raf=0;
      x+=(tx-x)*.16;
      y+=(ty-y)*.16;
      glow.style.transform="translate3d("+x+"px,"+y+"px,0)";
      if(Math.abs(tx-x)>.2||Math.abs(ty-y)>.2)raf=requestAnimationFrame(draw);
    };
    window.addEventListener("pointermove",e=>{
      tx=e.clientX;ty=e.clientY;
      glow.style.opacity=".92";
      if(!raf)raf=requestAnimationFrame(draw);
    },{passive:true});
    document.documentElement.addEventListener("mouseleave",()=>glow.style.opacity="0");
  };

  const setupSurfaceLighting=()=>{
    if(!finePointer)return;
    const selectors=[
      ".capability-item",".creation-item",".relation-item",".audience-row",
      ".workflow-step",".engineering-row",".founder-portrait",".contact-link"
    ];
    qa(selectors.join(",")).forEach(el=>{
      if(el.dataset.batingaInteractive==="1")return;
      el.dataset.batingaInteractive="1";
      el.classList.add("batinga-interactive-surface");
      el.addEventListener("pointermove",e=>{
        const r=el.getBoundingClientRect();
        el.style.setProperty("--px",((e.clientX-r.left)/r.width*100).toFixed(1)+"%");
        el.style.setProperty("--py",((e.clientY-r.top)/r.height*100).toFixed(1)+"%");
      },{passive:true});
    });

    qa(".platform-node").forEach(el=>{
      if(el.dataset.batingaLight==="1")return;
      el.dataset.batingaLight="1";
      el.addEventListener("pointermove",e=>{
        const r=el.getBoundingClientRect();
        el.style.setProperty("--px",((e.clientX-r.left)/r.width*100).toFixed(1)+"%");
        el.style.setProperty("--py",((e.clientY-r.top)/r.height*100).toFixed(1)+"%");
      },{passive:true});
    });
  };

  const setupSectionRules=()=>{
    const targets=[
      "#visao .section-heading",
      "#plataforma .section-heading",
      ".architecture-section .section-heading",
      ".engineering-intro",
      ".founder-copy",
      ".contact-heading",
      ".audience-intro"
    ];
    targets.forEach(sel=>{
      const host=q(sel);
      if(!host||q(".batinga-section-rule",host))return;
      const rule=document.createElement("div");
      rule.className="batinga-section-rule";
      rule.setAttribute("aria-hidden","true");
      host.prepend(rule);

      if(!("IntersectionObserver" in window)||reduce){
        rule.classList.add("is-visible");
        return;
      }
      const obs=new IntersectionObserver(([entry])=>{
        if(entry?.isIntersecting){
          rule.classList.add("is-visible");
          obs.disconnect();
        }
      },{threshold:.25});
      obs.observe(host);
    });
  };

  const setupHeroDepth=()=>{
    if(reduce||!finePointer)return;
    const hero=q(".hero");
    const core=q(".digital-core-stage");
    if(!hero||!core||hero.dataset.batingaDepth==="1")return;
    hero.dataset.batingaDepth="1";
    hero.addEventListener("pointermove",e=>{
      const r=hero.getBoundingClientRect();
      const nx=(e.clientX-r.left)/r.width-.5;
      const ny=(e.clientY-r.top)/r.height-.5;
      core.style.transform="translate3d("+(nx*8).toFixed(2)+"px,"+(ny*6).toFixed(2)+"px,0)";
    },{passive:true});
    hero.addEventListener("pointerleave",()=>{core.style.transform="translate3d(0,0,0)";});
  };

  const setup=()=>{
    setupProgress();
    setupCursorLight();
    setupSurfaceLighting();
    setupSectionRules();
    setupHeroDepth();
  };

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();

  setTimeout(setup,900);
  setTimeout(setup,2200);
})();
