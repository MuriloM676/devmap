import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0a0a0f", surface: "#12121a", border: "#1e1e2e",
  accent: "#00f5c4", accentDim: "#00f5c420", accentGlow: "#00f5c460",
  purple: "#9d4edd", purpleDim: "#9d4edd20",
  blue: "#3a86ff", blueDim: "#3a86ff20",
  orange: "#ff6b35", orangeDim: "#ff6b3520",
  text: "#e8e8f0", textMuted: "#6b6b8a", textDim: "#3a3a5c",
};

const LEVEL_COLORS = {
  core:         { color: COLORS.accent,  dim: COLORS.accentDim,  glow: COLORS.accentGlow },
  fundamental:  { color: COLORS.blue,    dim: COLORS.blueDim,    glow: "#3a86ff60" },
  intermediate: { color: COLORS.purple,  dim: COLORS.purpleDim,  glow: "#9d4edd60" },
  advanced:     { color: COLORS.orange,  dim: COLORS.orangeDim,  glow: "#ff6b3560" },
};

const MAPS = {
  React: {
    nodes: [
      { id: "react",      label: "React",        level: "core",         icon: "⚛️",  order: null, description: "Biblioteca JavaScript para construção de interfaces com componentes reutilizáveis. Base do ecossistema front-end moderno.", resources: ["react.dev (docs oficiais)", "React DevTools", "Vite + React"] },
      { id: "js",         label: "JavaScript",   level: "fundamental",  icon: "📜",  order: 1,    description: "Fundamento absoluto. Domine ES6+: arrow functions, destructuring, promises e async/await antes de tudo.", resources: ["javascript.info", "MDN Web Docs", "Eloquent JavaScript"] },
      { id: "html_css",   label: "HTML/CSS",     level: "fundamental",  icon: "🎨",  order: 2,    description: "Estrutura e estilo das páginas. Entenda o DOM e como o React o manipula virtualmente via JSX.", resources: ["MDN HTML", "CSS Tricks", "Flexbox Froggy"] },
      { id: "components", label: "Componentes",  level: "intermediate", icon: "🧩",  order: 3,    description: "Blocos de construção do React. Props, composição e boas práticas de componentização.", resources: ["React docs: Components", "Storybook", "Atomic Design"] },
      { id: "hooks",      label: "Hooks",        level: "intermediate", icon: "🪝",  order: 4,    description: "useState, useEffect, useContext e hooks customizados. O coração do React moderno.", resources: ["useHooks.com", "React hooks docs", "Thinking in React"] },
      { id: "state",      label: "Estado Global",level: "intermediate", icon: "🌐",  order: 5,    description: "Gerenciamento de estado com Context API, Zustand ou Redux para aplicações maiores.", resources: ["Zustand docs", "Redux Toolkit", "Jotai"] },
      { id: "routing",    label: "Roteamento",   level: "intermediate", icon: "🗺️",  order: 6,    description: "Navegação entre páginas com React Router v6 ou Next.js App Router.", resources: ["React Router v6", "Next.js docs", "TanStack Router"] },
      { id: "perf",       label: "Performance",  level: "advanced",     icon: "⚡",  order: 7,    description: "useMemo, useCallback, React.memo, lazy loading e profiling com DevTools.", resources: ["React Profiler", "web.dev performance", "Million.js"] },
      { id: "testing",    label: "Testes",       level: "advanced",     icon: "🧪",  order: 8,    description: "Testes unitários com Jest e Testing Library. TDD para componentes robustos.", resources: ["Testing Library", "Vitest", "Playwright (E2E)"] },
      { id: "nextjs",     label: "Next.js",      level: "advanced",     icon: "🔺",  order: 9,    description: "Framework full-stack com SSR, SSG, API Routes e App Router. O próximo passo natural após dominar React.", resources: ["nextjs.org", "Vercel deploy", "Next.js examples"] },
    ],
    edges: [
      { from: "js", to: "react" }, { from: "html_css", to: "react" },
      { from: "react", to: "components" }, { from: "components", to: "hooks" },
      { from: "hooks", to: "state" }, { from: "hooks", to: "routing" },
      { from: "state", to: "perf" }, { from: "hooks", to: "testing" },
      { from: "routing", to: "nextjs" }, { from: "perf", to: "nextjs" },
    ],
  },
  Python: {
    nodes: [
      { id: "python",      label: "Python",        level: "core",         icon: "🐍",  order: null, description: "Linguagem de alto nível, legível e versátil. Usada em web, dados, IA e automação.", resources: ["python.org", "docs.python.org", "Real Python"] },
      { id: "syntax",      label: "Sintaxe",       level: "fundamental",  icon: "📝",  order: 1,    description: "Variáveis, tipos, loops, condicionais e funções. A base que tudo mais depende.", resources: ["python.org/tutorial", "W3Schools Python", "Automate the Boring Stuff"] },
      { id: "oop",         label: "OOP",           level: "fundamental",  icon: "🏗️",  order: 2,    description: "Classes, objetos, herança e encapsulamento. Essencial para projetos maiores.", resources: ["Real Python OOP", "Python docs: classes", "Fluent Python"] },
      { id: "stdlib",      label: "Stdlib",        level: "intermediate", icon: "📦",  order: 3,    description: "Biblioteca padrão: os, sys, pathlib, json, datetime. Use antes de instalar pacotes externos.", resources: ["docs.python.org/library", "Python Module of the Week"] },
      { id: "pip",         label: "pip/venv",      level: "intermediate", icon: "⚙️",  order: 4,    description: "Gerenciamento de pacotes e ambientes virtuais. Boas práticas de projeto desde o início.", resources: ["pip docs", "Poetry", "pyenv"] },
      { id: "pandas",      label: "Pandas",        level: "intermediate", icon: "🐼",  order: 5,    description: "Manipulação e análise de dados com DataFrames. Indispensável para data science.", resources: ["pandas.pydata.org", "Kaggle: Pandas", "10 minutes to pandas"] },
      { id: "flask",       label: "FastAPI",       level: "intermediate", icon: "🌐",  order: 6,    description: "Criação de APIs e aplicações web. FastAPI para performance, Flask para simplicidade.", resources: ["fastapi.tiangolo.com", "flask.palletsprojects.com"] },
      { id: "ml",          label: "ML",            level: "advanced",     icon: "🤖",  order: 7,    description: "Machine Learning com scikit-learn. Regressão, classificação, clustering e pipelines.", resources: ["scikit-learn.org", "Kaggle courses", "Hands-on ML (livro)"] },
      { id: "async",       label: "Async",         level: "advanced",     icon: "⚡",  order: 8,    description: "asyncio, await e programação assíncrona para apps de alta performance.", resources: ["asyncio docs", "Real Python async", "aiohttp"] },
      { id: "testing_py",  label: "Testes",        level: "advanced",     icon: "🧪",  order: 9,    description: "pytest para testes unitários e de integração. TDD e fixtures para código confiável.", resources: ["pytest docs", "Real Python testing", "unittest docs"] },
    ],
    edges: [
      { from: "syntax", to: "python" }, { from: "oop", to: "python" },
      { from: "python", to: "stdlib" }, { from: "python", to: "pip" },
      { from: "pip", to: "pandas" }, { from: "pip", to: "flask" },
      { from: "pandas", to: "ml" }, { from: "flask", to: "async" },
      { from: "stdlib", to: "testing_py" }, { from: "ml", to: "testing_py" },
    ],
  },
  Docker: {
    nodes: [
      { id: "docker",      label: "Docker",        level: "core",         icon: "🐳",  order: null, description: "Plataforma de containerização que empacota apps e dependências em ambientes isolados e portáteis.", resources: ["docs.docker.com", "Play with Docker", "Docker Hub"] },
      { id: "linux",       label: "Linux Básico",  level: "fundamental",  icon: "🐧",  order: 1,    description: "Comandos essenciais: ls, cd, chmod, ps, grep. Docker usa o kernel Linux.", resources: ["Linux Journey", "tldr pages", "OverTheWire: Bandit"] },
      { id: "networking",  label: "Redes",         level: "fundamental",  icon: "🌐",  order: 2,    description: "TCP/IP, portas, DNS e HTTP. Fundamental para entender exposição de containers.", resources: ["Computer Networking: A Top-Down Approach"] },
      { id: "dockerfile",  label: "Dockerfile",    level: "intermediate", icon: "📄",  order: 3,    description: "FROM, RUN, COPY, CMD, EXPOSE. A receita que define como sua imagem é construída.", resources: ["Dockerfile reference", "Best practices guide", "Dive (tool)"] },
      { id: "images",      label: "Imagens",       level: "intermediate", icon: "🖼️",  order: 4,    description: "Layers, cache, multi-stage builds e otimização de tamanho de imagem.", resources: ["Docker Hub", "distroless images", "Hadolint"] },
      { id: "compose",     label: "Compose",       level: "intermediate", icon: "🎼",  order: 5,    description: "docker-compose.yml para orquestrar múltiplos containers localmente. Volumes e networks.", resources: ["Compose docs", "Awesome Compose (GitHub)"] },
      { id: "volumes",     label: "Volumes",       level: "intermediate", icon: "💾",  order: 6,    description: "Persistência de dados com volumes e bind mounts. Dados que sobrevivem ao ciclo do container.", resources: ["Volumes docs", "tmpfs mounts"] },
      { id: "registry",    label: "Registry",      level: "advanced",     icon: "📦",  order: 7,    description: "Docker Hub, GHCR e registries privados. Push, pull e gerenciamento de versões de imagens.", resources: ["Docker Hub", "GitHub Container Registry", "Harbor"] },
      { id: "kubernetes",  label: "Kubernetes",    level: "advanced",     icon: "☸️",  order: 8,    description: "Orquestração de containers em produção. Pods, Deployments, Services e Ingress.", resources: ["kubernetes.io", "k3s (leve)", "Killercoda labs"] },
      { id: "security",    label: "Segurança",     level: "advanced",     icon: "🔒",  order: 9,    description: "Scan de vulnerabilidades, non-root users, secrets management e políticas de rede.", resources: ["Trivy scanner", "Docker Bench", "Snyk Container"] },
    ],
    edges: [
      { from: "linux", to: "docker" }, { from: "networking", to: "docker" },
      { from: "docker", to: "dockerfile" }, { from: "dockerfile", to: "images" },
      { from: "images", to: "compose" }, { from: "docker", to: "volumes" },
      { from: "compose", to: "registry" }, { from: "registry", to: "kubernetes" },
      { from: "images", to: "security" }, { from: "kubernetes", to: "security" },
    ],
  },
  "Node.js": {
    nodes: [
      { id: "node",        label: "Node.js",       level: "core",         icon: "🟢",  order: null, description: "Runtime JavaScript no servidor baseado no motor V8 do Chrome. Ideal para APIs e apps em tempo real.", resources: ["nodejs.org", "Node.js docs", "Node Best Practices (GitHub)"] },
      { id: "js_node",     label: "JavaScript",    level: "fundamental",  icon: "📜",  order: 1,    description: "ES6+, closures, prototype chain e o event loop. Base obrigatória antes de qualquer framework.", resources: ["javascript.info", "You Don't Know JS", "MDN Web Docs"] },
      { id: "npm",         label: "npm/yarn",      level: "fundamental",  icon: "📦",  order: 2,    description: "Gerenciamento de pacotes, scripts, package.json e lockfiles. Ecossistema central do Node.", resources: ["npmjs.com", "npm docs", "pnpm (alternativa)"] },
      { id: "modules",     label: "Módulos",       level: "intermediate", icon: "🧩",  order: 3,    description: "CommonJS (require) vs ESModules (import/export). Entenda as diferenças e quando usar cada.", resources: ["Node.js modules docs", "ESM vs CJS", "tsup bundler"] },
      { id: "async_node",  label: "Async",         level: "intermediate", icon: "⚡",  order: 4,    description: "Event loop, callbacks, Promises e async/await. O núcleo do modelo não-bloqueante do Node.", resources: ["Node.js event loop", "libuv docs", "Async patterns"] },
      { id: "express",     label: "Express",       level: "intermediate", icon: "🚂",  order: 5,    description: "Framework minimalista para APIs REST. Rotas, middlewares e tratamento de erros.", resources: ["expressjs.com", "Express generator", "Fastify (alternativa)"] },
      { id: "db",          label: "Banco de Dados",level: "intermediate", icon: "🗄️",  order: 6,    description: "Integração com PostgreSQL (Prisma/pg), MongoDB (Mongoose) e Redis para cache.", resources: ["Prisma ORM", "Mongoose docs", "node-postgres"] },
      { id: "testing_node",label: "Testes",        level: "advanced",     icon: "🧪",  order: 7,    description: "Vitest ou Jest para testes unitários, Supertest para APIs e mocks com MSW.", resources: ["Vitest docs", "Supertest", "MSW (Mock Service Worker)"] },
      { id: "auth",        label: "Auth & JWT",    level: "advanced",     icon: "🔐",  order: 8,    description: "Autenticação com JWT, sessions, OAuth2 e bibliotecas como Passport.js ou Auth.js.", resources: ["JWT.io", "Passport.js", "Auth.js (NextAuth)"] },
      { id: "deploy",      label: "Deploy",        level: "advanced",     icon: "🚀",  order: 9,    description: "PM2, Docker, CI/CD com GitHub Actions e deploy em Railway, Render ou AWS.", resources: ["PM2 docs", "Railway.app", "GitHub Actions"] },
    ],
    edges: [
      { from: "js_node", to: "node" }, { from: "npm", to: "node" },
      { from: "node", to: "modules" }, { from: "node", to: "async_node" },
      { from: "async_node", to: "express" }, { from: "express", to: "db" },
      { from: "db", to: "auth" }, { from: "express", to: "testing_node" },
      { from: "auth", to: "deploy" }, { from: "testing_node", to: "deploy" },
    ],
  },
};

function buildLayout(nodes) {
  const levels = { core: [], fundamental: [], intermediate: [], advanced: [] };
  nodes.forEach(n => levels[n.level]?.push(n));
  const positions = {};
  const W = 680, H = 520, cx = W / 2, cy = H / 2;
  if (levels.core[0]) positions[levels.core[0].id] = { x: cx, y: cy };
  const radii = { fundamental: 130, intermediate: 240, advanced: 340 };
  Object.entries(radii).forEach(([level, r]) => {
    levels[level].forEach((n, i) => {
      const angle = (2 * Math.PI * i / levels[level].length) - Math.PI / 2;
      positions[n.id] = { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });
  });
  return positions;
}

function NodeCard({ node, x, y, selected, onClick, animDelay }) {
  const lc = LEVEL_COLORS[node.level] || LEVEL_COLORS.fundamental;
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), animDelay); return () => clearTimeout(t); }, [animDelay]);
  return (
    <g transform={`translate(${x}, ${y})`} onClick={() => onClick(node)}
      style={{ cursor: "pointer", opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}>
      {selected && <circle r="48" fill={lc.glow} style={{ filter: "blur(12px)" }} />}
      <circle r={node.level === "core" ? 42 : 32} fill={lc.dim} stroke={lc.color}
        strokeWidth={selected ? 2.5 : 1.5} style={{ transition: "all 0.3s ease" }} />
      <circle r={node.level === "core" ? 28 : 20} fill={selected ? lc.dim : "transparent"}
        stroke={lc.color} strokeWidth="1" strokeDasharray={node.level !== "core" ? "3 3" : "none"} opacity="0.5" />
      <text textAnchor="middle" dominantBaseline="middle" fontSize={node.level === "core" ? 20 : 14}>{node.icon}</text>
      <text y={node.level === "core" ? 54 : 44} textAnchor="middle"
        fill={selected ? lc.color : COLORS.text} fontSize="11"
        fontFamily="'JetBrains Mono', monospace" fontWeight={selected ? "700" : "400"}
        style={{ transition: "fill 0.3s ease" }}>{node.label}</text>
      <text y={node.level === "core" ? 67 : 56} textAnchor="middle"
        fill={lc.color} fontSize="8" fontFamily="'JetBrains Mono', monospace" opacity="0.7">
        {node.level.toUpperCase()}
      </text>
    </g>
  );
}

function Edge({ x1, y1, x2, y2, color, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t); }, [delay]);
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 30;
  return (
    <path d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} fill="none"
      stroke={color} strokeWidth="1.5" opacity={visible ? 0.4 : 0}
      style={{ transition: "opacity 0.6s ease" }} />
  );
}

function InfoPanel({ node, onClose }) {
  if (!node) return null;
  const lc = LEVEL_COLORS[node.level] || LEVEL_COLORS.fundamental;
  return (
    <div style={{
      position: "absolute", right: 12, top: 12, width: 260,
      background: COLORS.surface, border: `1px solid ${lc.color}40`,
      borderRadius: 12, padding: 18, fontFamily: "'JetBrains Mono', monospace",
      boxShadow: `0 0 30px ${lc.glow}`, animation: "slideIn 0.3s ease", zIndex: 10,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <span style={{ fontSize: 22 }}>{node.icon}</span>
          <div style={{ color: lc.color, fontSize: 13, fontWeight: 700, marginTop: 4 }}>{node.label}</div>
          <div style={{ color: COLORS.textMuted, fontSize: 9, textTransform: "uppercase", letterSpacing: 2 }}>{node.level}</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", fontSize: 18, padding: 0 }}>×</button>
      </div>
      <p style={{ color: COLORS.text, fontSize: 11, lineHeight: 1.7, margin: "10px 0" }}>{node.description}</p>
      <div style={{ color: COLORS.textMuted, fontSize: 9, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>Recursos</div>
      {node.resources.map((r, i) => (
        <div key={i} style={{ color: lc.color, fontSize: 10, marginBottom: 4, display: "flex", gap: 6 }}>
          <span style={{ opacity: 0.5 }}>›</span>{r}
        </div>
      ))}
      {node.order && (
        <div style={{ marginTop: 10, padding: "7px 10px", background: lc.dim, borderRadius: 6, fontSize: 10, color: lc.color }}>
          🎯 Estude na ordem #{node.order}
        </div>
      )}
    </div>
  );
}

export default function KnowledgeMap() {
  const [active, setActive] = useState("React");
  const [selected, setSelected] = useState(null);
  const [positions, setPositions] = useState({});
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const font = document.createElement("link");
    font.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;700&family=Syne:wght@400;700;800&display=swap";
    font.rel = "stylesheet";
    document.head.appendChild(font);
  }, []);

  useEffect(() => {
    setPositions(buildLayout(MAPS[active].nodes));
    setSelected(null);
    setAnimKey(k => k + 1);
  }, [active]);

  const mapData = MAPS[active];
  const W = 680, H = 520;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'JetBrains Mono', monospace" }}>
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(20px) } to { opacity:1; transform:translateX(0) } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        * { box-sizing: border-box; }
        .tab-btn { background: none; border: 1px solid #1e1e2e; border-radius: 8px; padding: 8px 18px; color: #6b6b8a; font-size: 12px; font-family: 'JetBrains Mono', monospace; cursor: pointer; transition: all 0.2s ease; }
        .tab-btn:hover { border-color: #00f5c4; color: #00f5c4; }
        .tab-btn.active { background: #00f5c420; border-color: #00f5c4; color: #00f5c4; font-weight: 700; }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 28, animation: "fadeUp 0.6s ease" }}>
        <div style={{ fontSize: 10, color: COLORS.accent, letterSpacing: 6, textTransform: "uppercase", marginBottom: 8 }}>◈ Knowledge Graph</div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(26px, 5vw, 44px)", fontWeight: 800, color: COLORS.text, margin: 0, lineHeight: 1.1 }}>
          Mapa de<br /><span style={{ color: COLORS.accent }}>Conhecimento</span>
        </h1>
        <p style={{ color: COLORS.textMuted, fontSize: 12, marginTop: 8 }}>
          Escolha uma tecnologia e veja o caminho completo para aprendê-la
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", justifyContent: "center", animation: "fadeUp 0.6s ease 0.1s both" }}>
        {Object.keys(MAPS).map(name => (
          <button key={name} className={`tab-btn${active === name ? " active" : ""}`} onClick={() => setActive(name)}>
            {MAPS[name].nodes[0].icon} {name}
          </button>
        ))}
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 720, animation: "fadeUp 0.5s ease 0.2s both" }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
          {Object.entries(LEVEL_COLORS).map(([level, lc]) => (
            <div key={level} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: lc.color }} />
              <span style={{ color: COLORS.textMuted, fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{level}</span>
            </div>
          ))}
        </div>

        <div style={{ position: "relative", background: COLORS.surface, borderRadius: 16, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={COLORS.accent} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <svg key={animKey} viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", position: "relative" }}>
            {mapData.edges.map((e, i) => {
              const p1 = positions[e.from], p2 = positions[e.to];
              if (!p1 || !p2) return null;
              const fromNode = mapData.nodes.find(n => n.id === e.from);
              const lc = LEVEL_COLORS[fromNode?.level] || LEVEL_COLORS.fundamental;
              return <Edge key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} color={lc.color} delay={i * 80} />;
            })}
            {mapData.nodes.map((node, i) => {
              const p = positions[node.id];
              if (!p) return null;
              return <NodeCard key={node.id} node={node} x={p.x} y={p.y} selected={selected?.id === node.id} onClick={setSelected} animDelay={i * 100 + 200} />;
            })}
          </svg>

          <InfoPanel node={selected} onClose={() => setSelected(null)} />
        </div>

        <p style={{ color: COLORS.textMuted, fontSize: 11, textAlign: "center", marginTop: 10 }}>
          Clique em qualquer nó para ver detalhes e recursos de estudo
        </p>
      </div>

      <div style={{ marginTop: 28, color: COLORS.textDim, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>
        ◈ Knowledge Graph — React · Python · Docker · Node.js
      </div>
    </div>
  );
}
