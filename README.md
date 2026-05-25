# 🦜 LangChain Experiments

A monorepo exploring real-time LLM response streaming using **LangChain.js**. The server streams tokens from an LLM as they are generated — the React client renders each chunk live, producing a natural typing effect identical to ChatGPT's UI behaviour.

---

## ✨ What This Demonstrates

- **LangChain.js streaming** — using `.stream()` and `StreamingCallbackHandler` to pipe LLM output chunk-by-chunk
- **Server-Sent Events (SSE)** — token delivery from Express server to browser in real time
- **Live typing UI** — React state management that appends each incoming token without re-rendering the full response
- **Prompt chaining fundamentals** — structuring LangChain chains for extensibility
- **Monorepo structure** — shared tooling across server and client with a single `npm install`

---

## 🏗️ Architecture

```
langchain-experiments/
├── apps/
│   ├── server/       # Node.js + Express + LangChain.js streaming API
│   └── client/       # React + TypeScript real-time streaming frontend
├── package.json      # Workspace root — runs both apps concurrently
```

### How it works

```
User types prompt
      │
      ▼
React Client (apps/client)
      │  POST /chat
      ▼
Express Server (apps/server)
      │  LangChain chain.stream()
      ▼
OpenAI / LLM Provider
      │  token stream
      ▼
Server-Sent Events (SSE)
      │  chunk by chunk
      ▼
React Client — appends each token live
      │
      ▼
Typing effect rendered in UI
```

**Server:** Express receives the prompt, passes it through a LangChain chain, and streams the LLM response back via SSE — one token per event.

**Client:** React reads the SSE stream and appends each token to a state string, triggering a re-render per chunk. The result is a smooth, real-time typing effect with no polling.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| LLM Orchestration | LangChain.js |
| API Server | Node.js + Express + TypeScript |
| Streaming Protocol | Server-Sent Events (SSE) |
| Frontend | React + TypeScript + Vite |
| LLM Provider | OpenAI (GPT-4o / GPT-3.5-turbo) |
| Monorepo | npm workspaces |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### 1. Clone and install

```bash
git clone https://github.com/itsahmadawais/langchain-experiments.git
cd langchain-experiments
npm install
```

### 2. Configure environment variables

```bash
# apps/server/.env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

```bash
# apps/client/.env
VITE_API_URL=http://localhost:3001
```

### 3. Run both apps

```bash
npm run dev        # starts server + client concurrently
```

- **Client** → [http://localhost:5173](http://localhost:5173)
- **Server** → [http://localhost:3001](http://localhost:3001)

### 4. Run individually

```bash
npm run dev --workspace=apps/server   # server only
npm run dev --workspace=apps/client   # client only
```

---

## 📡 API Reference

### `POST /chat`

Accepts a prompt and streams the LLM response token-by-token via SSE.

**Request**
```json
{
  "prompt": "Explain how LangChain streaming works in simple terms"
}
```

**Response** — `text/event-stream`
```
data: {"token": "Lang"}
data: {"token": "Chain"}
data: {"token": " streams"}
data: {"token": " responses"}
...
data: [DONE]
```

---

## 📁 Project Structure

```
apps/
├── server/
│   ├── src/
│   │   ├── chains/       # LangChain chain definitions
│   │   ├── routes/       # Express route handlers
│   │   ├── streaming/    # SSE streaming logic
│   │   └── index.ts      # Server entry point
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/   # UI components
    │   ├── hooks/        # useStream custom hook
    │   └── App.tsx       # Root component
    └── package.json
```

---

## 🗺️ Roadmap

- [x] Basic LangChain streaming via SSE
- [x] Real-time React typing UI
- [ ] RAG pipeline with vector store (Pinecone / pgvector)
- [ ] Multi-turn conversation memory with `ConversationBufferMemory`
- [ ] Tool calling / LangChain agent experiments
- [ ] Switch between providers — OpenAI / Anthropic / Gemini
- [ ] Deployable demo (Railway + Vercel)

---

## 🔗 Related Projects

| Project | Description |
|---|---|
| [chat-with-pdf-langchain](https://github.com/itsahmadawais/chat-with-pdf-langchain) | RAG pipeline — chat with PDF documents using LangChain + vector embeddings |
| [gemini-chatbot-react](https://github.com/itsahmadawais/gemini-chatbot-react) | Chatbot using Google Gemini API with React frontend |

---

## 📜 License

MIT — see [LICENSE](./LICENSE) for details.

---

## 👤 Author

Built by [Awais Ahmad](https://github.com/itsahmadawais) — Senior Backend & AI Engineer  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-itsahmadawais-0077B5?logo=linkedin)](https://www.linkedin.com/in/itsahmadawais/)