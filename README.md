# ⚡ NeuralChat — AI Chatbot

> Full-stack AI Chatbot built with **MERN Stack** and **Groq API** — featuring real-time streaming, persistent memory, and multi-session support.

🔗 **Live Demo:** [neural-chat-beta.vercel.app](https://neural-chat-beta.vercel.app)

---

## 🚀 Features

| Feature | Details |
|---|---|
| ⚡ Real-time Streaming | SSE-based token streaming (ChatGPT-style) |
| 💾 MongoDB Persistence | Full chat history saved per session |
| 🔄 Multi-Session | Create, switch, delete chat sessions |
| 🧠 Conversation Memory | Full history passed to AI on every request |
| 🛡️ Input Validation | express-validator + custom middleware |
| 🚦 Rate Limiting | Per-IP limits on API and chat endpoints |
| 🌐 CORS Configured | Ready for cross-origin deployment |
| 📱 Responsive UI | Works on mobile and desktop |

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express** — REST API server
- **Groq API** (`llama-3.3-70b-versatile`) — AI model (Free tier)
- **MongoDB + Mongoose** — Database & ODM
- **express-validator** — Input validation
- **express-rate-limit** — Rate limiting

### Frontend
- **React 18** — UI library
- **Tailwind CSS** — Utility-first styling
- **Axios** — HTTP client with interceptors
- **React Router v6** — Client-side routing
- **Zustand** — Lightweight state management

---

## 📁 Project Structure

```
neuralchat/
├── server/                         # Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js               # MongoDB connection
│   │   │   └── env.js              # Environment validation
│   │   ├── controllers/
│   │   │   ├── chatController.js   # Chat logic + SSE headers
│   │   │   └── sessionController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js     # Global error handler
│   │   │   ├── validateRequest.js  # Validation middleware
│   │   │   └── rateLimiter.js      # Rate limiting (api + chat)
│   │   ├── models/
│   │   │   └── ChatSession.js      # Mongoose schema
│   │   ├── routes/
│   │   │   ├── chatRoutes.js
│   │   │   └── sessionRoutes.js
│   │   ├── services/
│   │   │   └── chatService.js      # Groq streaming logic
│   │   └── utils/
│   │       └── logger.js           # Console logger utility
│   ├── .env.example
│   ├── package.json
│   └── index.js                    # Entry point
│
└── client/                         # React Frontend
    ├── src/
    │   ├── api/
    │   │   └── axiosInstance.js    # Axios config + interceptors
    │   ├── components/
    │   │   ├── chat/
    │   │   │   ├── ChatWindow.jsx
    │   │   │   ├── MessageBubble.jsx
    │   │   │   └── InputBar.jsx
    │   │   ├── layout/
    │   │   │   ├── Sidebar.jsx
    │   │   │   └── Header.jsx
    │   │   └── ui/
    │   │       └── EmptyState.jsx
    │   ├── hooks/
    │   │   ├── useChat.js          # SSE stream consumer
    │   │   └── useSessions.js      # Session management
    │   ├── pages/
    │   │   └── ChatPage.jsx        # Main page
    │   ├── store/
    │   │   └── chatStore.js        # Zustand global state
    │   ├── utils/
    │   │   └── markdownParser.js   # ReactMarkdown component config
    │   ├── App.jsx
    │   └── index.js
    ├── tailwind.config.js
    ├── .env.example
    └── package.json
```

---

## ⚡ Local Setup

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (free)
- Groq account (free)

### 1. Clone & Install

```bash
git clone https://github.com/preetverma089/NeuralChat.git
cd NeuralChat

# Install server deps
cd server && npm install

# Install client deps
cd ../client && npm install
```

### 2. Environment Variables

```bash
# Server
cd server
cp .env.example .env
# Fill in GROQ_API_KEY and MONGODB_URI

# Client
cd ../client
cp .env.example .env.local
# Fill in REACT_APP_API_URL
```

### 3. Get Free API Keys

| Service | Link | Free Limit |
|---|---|---|
| Groq | https://console.groq.com | 14,400 req/day |
| MongoDB Atlas | https://cloud.mongodb.com | 512 MB |

### 4. Run

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm start
```

App runs at: `http://localhost:3000`

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
- Already cloud-hosted ✅
- Network Access → Allow `0.0.0.0/0` for Render access

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

## 📜 License
MIT
