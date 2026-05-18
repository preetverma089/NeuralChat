# ⚡ NeuralChat — AI Chatbot

> Full-stack AI Chatbot built with **MERN Stack**, **LangChain**, and **Groq API** — featuring real-time streaming, persistent memory, multi-session support, Dockerized deployment, and CI/CD pipeline.

🔗 **Live Demo:** [neural-chat-beta.vercel.app](https://neural-chat-beta.vercel.app)

---

## 🚀 Features

| Feature | Details |
|---|---|
| ⚡ Real-time Streaming | SSE-based token streaming (ChatGPT-style) |
| 🧠 LangChain Orchestration | `@langchain/groq` — swappable LLM provider |
| 💾 MongoDB Persistence | Full chat history saved per session |
| 🔄 Multi-Session | Create, switch, delete chat sessions |
| 🧩 Conversation Memory | Full history passed to LangChain on every request |
| 🛡️ Input Validation | express-validator + validateRequest middleware |
| 🚦 Rate Limiting | Separate limits for API and chat endpoints |
| 🐳 Docker | Multi-stage builds for both client and server |
| ⚙️ CI/CD | GitHub Actions — build, Docker validation, auto-deploy |
| 🌐 CORS Configured | Supports all Vercel preview URLs |
| 📱 Responsive UI | Mobile-first design with collapsible sidebar |
| 🔒 Error Boundaries | React ErrorBoundary for graceful UI failure handling |

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express** — REST API server
- **LangChain** (`@langchain/groq`) — LLM orchestration layer
- **Groq API** (`llama-3.3-70b-versatile`) — AI model (free tier)
- **MongoDB + Mongoose** — Database & ODM
- **express-validator** — Input validation
- **express-rate-limit** — Rate limiting

### Frontend
- **React 18** — UI library
- **Tailwind CSS** — Utility-first styling
- **Zustand** — Lightweight global state management
- **Axios** — HTTP client with interceptors
- **React Router v6** — Client-side routing
- **react-markdown + remark-gfm** — AI response markdown rendering

### DevOps
- **Docker** — Multi-stage builds (node:20-alpine + nginx:alpine)
- **GitHub Actions** — CI/CD pipeline
- **Render** — Backend cloud deployment
- **Vercel** — Frontend cloud deployment
- **MongoDB Atlas** — Cloud database

---

## 📁 Project Structure

```
neuralchat/
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI/CD
├── server/                         # Express Backend
│   ├── Dockerfile                  # Multi-stage Docker build
│   ├── .dockerignore
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js               # MongoDB connection
│   │   │   └── env.js              # Environment validation
│   │   ├── controllers/
│   │   │   ├── chatController.js   # Chat logic + SSE headers
│   │   │   └── sessionController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js     # Global error handler
│   │   │   ├── validateRequest.js  # Shared validation middleware
│   │   │   └── rateLimiter.js      # API + chat rate limiters
│   │   ├── models/
│   │   │   └── ChatSession.js      # Mongoose schema + methods
│   │   ├── routes/
│   │   │   ├── chatRoutes.js
│   │   │   └── sessionRoutes.js
│   │   ├── services/
│   │   │   └── chatService.js      # LangChain + Groq streaming
│   │   └── utils/
│   │       └── logger.js           # Colored console logger
│   ├── .env.example
│   ├── package.json
│   └── index.js
│
├── client/                         # React Frontend
│   ├── Dockerfile                  # Multi-stage: Node build + Nginx serve
│   ├── .dockerignore
│   ├── nginx.conf                  # SPA routing + gzip + cache headers
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js    # Axios config + interceptors
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   ├── MessageBubble.jsx
│   │   │   │   └── InputBar.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Header.jsx
│   │   │   └── ui/
│   │   │       ├── EmptyState.jsx
│   │   │       └── ErrorBoundary.jsx
│   │   ├── hooks/
│   │   │   ├── useChat.js          # SSE stream consumer
│   │   │   └── useSessions.js      # Session management
│   │   ├── pages/
│   │   │   └── ChatPage.jsx
│   │   ├── store/
│   │   │   └── chatStore.js        # Zustand global state
│   │   ├── utils/
│   │   │   └── markdownParser.js   # ReactMarkdown component config
│   │   ├── App.jsx                 # ErrorBoundary wrapper
│   │   └── index.js
│   ├── tailwind.config.js
│   ├── .env.example
│   └── package.json
│
└── docker-compose.yml              # Local development orchestration
```

---

## ⚡ Local Setup

### Option A — Standard (Node.js)

#### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (free)
- Groq account (free)

```bash
git clone https://github.com/preetverma089/NeuralChat.git
cd NeuralChat

cd server && npm install
cd ../client && npm install
```

```bash
cd server
cp .env.example .env
```

Fill in `server/.env`:
```
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=your_mongodb_uri_here
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

```bash
cd client
cp .env.example .env.local
```

Fill in `client/.env.local`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm start
```

App runs at: `http://localhost:3000`

---

### Option B — Docker

```bash
git clone https://github.com/preetverma089/NeuralChat.git
cd NeuralChat

# Make sure server/.env is filled in
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |

---

## ⚙️ CI/CD Pipeline

GitHub Actions runs on every push to `main`:

```
Git push → main
      ↓
GitHub Actions
  ├── Client: npm ci → npm run build → Docker build
  └── Server: npm ci → Docker build
      ↓
Both pass → Render deploy hook triggered
            Vercel auto-deploys
      ↓
Live on public URL
```

**Required GitHub Secrets:**

| Secret | Value |
|---|---|
| `REACT_APP_API_URL` | `https://your-app.onrender.com/api` |
| `RENDER_DEPLOY_HOOK` | From Render Dashboard → Settings → Deploy Hook |

---

## 🌐 Deployment

### Backend → Render.com
1. New Web Service → Connect GitHub
2. Root Directory: `server`
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add env variables from `server/.env.example`

### Frontend → Vercel
1. Import GitHub repo
2. Root Directory: `client`
3. Add `REACT_APP_API_URL=https://your-app.onrender.com/api`

### Database → MongoDB Atlas
- Network Access → Add `0.0.0.0/0` for Render access

---

## 🔌 API Reference

### Chat
```
POST   /api/chat/message          Send message (SSE streaming)
GET    /api/chat/history/:id      Get session chat history
```

### Sessions
```
GET    /api/sessions              List all sessions
POST   /api/sessions              Create new session
DELETE /api/sessions/:id          Delete session
```

### Health
```
GET    /api/health                Server health check
```

---

## 🔑 Free API Keys

| Service | Link | Free Limit |
|---|---|---|
| Groq | https://console.groq.com | 14,400 req/day |
| MongoDB Atlas | https://cloud.mongodb.com | 512 MB |

---

## 📜 License
MIT
