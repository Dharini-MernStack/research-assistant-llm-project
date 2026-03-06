# 🔍 Research Assistant LLM

A full-stack AI-powered research assistant that lets you upload any PDF document and ask questions about it in natural language. Built on a **Retrieval-Augmented Generation (RAG)** architecture — it doesn't just summarize, it finds the most relevant sections of your document and generates precise, context-aware answers with citations.

---

## 🚀 Demo

| Upload PDF | Ask Questions | Get Answers with Citations |
|------------|---------------|---------------------------|
| Upload any PDF via API | Ask anything in natural language | Get precise answers + source chunks |

---

## 🧠 How It Works

```
PDF Upload → Text Extraction → Chunking → Embeddings → Vector Store
                                                              ↓
                                          Question → Embed → Similarity Search
                                                              ↓
                                                    Top Chunks → LLM → Answer + Citations
```

1. **Upload a PDF** — parsed using `pdf2json`
2. **Text is chunked** — split into overlapping 2000-character chunks
3. **Embeddings created** — using HuggingFace `sentence-transformers/all-MiniLM-L6-v2` (free)
4. **Stored in vector store** — in-memory cosine similarity search
5. **Ask a question** — question is embedded and compared against chunks
6. **Top chunks retrieved** — most relevant sections fetched
7. **LLM generates answer** — using Groq's `llama-3.1-8b-instant` (free)
8. **Citations returned** — shows exactly which chunks were used

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js + Express |
| PDF Parsing | pdf2json |
| Embeddings | HuggingFace `all-MiniLM-L6-v2` |
| Vector Store | In-memory cosine similarity |
| LLM | Groq API (`llama-3.1-8b-instant`) |
| File Handling | Multer |

> 💡 **Fully free** — no OpenAI credits needed. Uses Groq + HuggingFace free tiers.

---

## 📁 Project Structure

```
backend/
├── routes/
│   └── upload.js            # Upload + Ask endpoints
├── services/
│   ├── llm.js               # Groq LLM integration
│   ├── embeddingService.js  # HuggingFace embeddings
│   ├── vectorStore.js       # In-memory vector store
│   └── retriever.js         # Similarity search retriever
├── utils/
│   └── chunking.js          # Text chunking with overlap
├── uploads/                 # Uploaded PDFs stored here
├── server.js
└── .env
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- Free [Groq API key](https://console.groq.com)
- Free [HuggingFace API token](https://huggingface.co/settings/tokens)

### 1. Clone the repo
```bash
git clone https://github.com/Dharini-MernStack/research-assistant-llm.git
cd research-assistant-llm/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
GROQ_API_KEY=your_groq_api_key_here
HF_API_KEY=your_huggingface_token_here
```

### 4. Start the server
```bash
node server.js
```

Server runs on `http://localhost:5000`

---

## 📡 API Usage

### Upload a PDF
```
POST http://localhost:5000/upload
Content-Type: multipart/form-data

Body (form-data):
  pdf      → your PDF file
  question → "Summarize this document" (optional)
```

**Response:**
```json
{
    "message": "Research complete",
    "filename": "1234567890-yourfile.pdf",
    "chunks": 8,
    "answer": "..."
}
```

---

### Ask a Question (RAG)
```
POST http://localhost:5000/upload/ask
Content-Type: application/json

{
    "filename": "1234567890-yourfile.pdf",
    "question": "What are the required skills?"
}
```

**Response:**
```json
{
    "question": "What are the required skills?",
    "answer": "The required skills are...",
    "citations": [
        {
            "chunkIndex": 3,
            "score": 0.87,
            "preview": "First 150 chars of the matching chunk..."
        }
    ]
}
```

---

## ✅ Day 1 — RAG Foundation
- [x] PDF upload and storage
- [x] Text extraction with pdf2json
- [x] Text chunking with overlap
- [x] Embeddings with HuggingFace (free)
- [x] In-memory vector store

## ✅ Day 2 — Retrieval & Q&A
- [x] Retriever with cosine similarity
- [x] `/ask` endpoint with full RAG pipeline
- [x] Answer generation from relevant context only
- [x] Citation extraction showing source chunks

## 🔜 Day 3 — Frontend (Coming Soon)
- [ ] React frontend
- [ ] PDF upload UI
- [ ] Chat interface
- [ ] Citation display
- [ ] Chat history per document

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

1. Fork the repo
2. Create your branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

[MIT](LICENSE)

---

## 👨‍💻 Author

Built with ❤️ by [Dharini](https://github.com/Dharini-MernStack)

> ⭐ If this project helped you, please give it a star!
