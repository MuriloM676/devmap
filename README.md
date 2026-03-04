# ◈ DevMap — Mapa de Conhecimento

![DevMap Preview](/home/muril/devmap/public/print.png)

> **Visualize o caminho completo para aprender qualquer tecnologia.**  
> Nós interativos, dependências visuais e recursos curados — tudo em um único mapa.

---

## ✨ Sobre o Projeto

O **DevMap** é uma aplicação web que transforma o aprendizado de tecnologias em um grafo visual interativo. Em vez de se perguntar *"por onde começo?"*, você vê de forma clara quais são os pré-requisitos, os conceitos centrais e os tópicos avançados — e a ordem certa para estudar cada um.

Cada nó do mapa contém:
- 📖 Descrição do conceito
- 🎯 Ordem sugerida de estudo
- 🔗 Recursos e materiais recomendados

---

## 🗺️ Tecnologias Disponíveis

| Tecnologia | Nós | Descrição |
|------------|-----|-----------|
| ⚛️ React | 10 | Do JavaScript puro ao Next.js |
| 🐍 Python | 10 | Da sintaxe ao Machine Learning |
| 🐳 Docker | 10 | Do Linux básico ao Kubernetes |
| 🟢 Node.js | 10 | Do npm ao deploy em produção |

---

## 🎨 Visual

O mapa é organizado em **4 camadas concêntricas**:

```
         ● CORE          →  A tecnologia principal
      ●  FUNDAMENTAL  ●   →  Pré-requisitos essenciais
   ●  INTERMEDIATE  ●     →  Conceitos centrais
 ●    ADVANCED    ●       →  Tópicos avançados
```

---

## 🚀 Como Rodar Localmente

**Pré-requisitos:** Node.js 18+

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/devmap.git
cd devmap

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## 🏗️ Stack

- **React** — Interface e componentes
- **Vite** — Build tool e dev server
- **SVG** — Renderização do grafo
- **CSS Animations** — Transições e efeitos

Zero dependências externas de UI. Todo o visual foi construído do zero com SVG e CSS puro.

---

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos otimizados ficam na pasta `dist/`, prontos para deploy.

---

## ☁️ Deploy

O projeto está configurado para deploy direto no **Vercel**:

1. Faça o push para o GitHub
2. Importe o repositório no [vercel.com](https://vercel.com)
3. Clique em **Deploy** — sem nenhuma configuração adicional

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se quiser adicionar um novo mapa de tecnologia:

1. Fork o repositório
2. Adicione o novo mapa no objeto `MAPS` em `src/App.jsx`
3. Abra um Pull Request

Cada mapa precisa de: 1 nó `core`, 2–3 `fundamental`, 3–4 `intermediate` e 2–3 `advanced`.

---

## 📄 Licença

MIT © [seu-usuario](https://github.com/seu-usuario)

---

<div align="center">
  <sub>Feito com ◈ e muito café</sub>
</div>
