

# EcoSync AI System

EcoSync is an **AI-powered system** that helps sustainable businesses automate product cataloging and generate B2B proposals using AI.
It integrates **Google Gemini AI** with real business logic to produce structured outputs that can be used in production systems.

---

## Features

### 1. AI Auto-Category & Tag Generator

* Automatically assigns **product category**
* Suggests **sub-category**
* Generates **SEO tags (5–10)**
* Suggests **sustainability filters** (plastic-free, compostable, vegan, recycled)
* Returns **structured JSON output**

### 2. AI B2B Proposal Generator

* Suggests **sustainable product mix**
* Performs **budget allocation**
* Generates **cost breakdown**
* Provides **impact positioning summary**
* Returns **structured JSON output**

---

##  Architecture Overview

The system follows a layered architecture with clear separation between AI logic and business logic.

```
User
 │
 ▼
React Frontend
 │
 ▼
Express API (server.ts)
 │
 ▼
AI Service (geminiService.ts)
 │
 ▼
Google Gemini API
 │
 ▼
SQLite Database (Users + Prompt History)
```

---

## Project Structure

```
ecosync-ai-system
│
├── src
│   ├── services
│   │   └── geminiService.ts
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
│
├── server.ts
├── package.json
└── README.md
```

---

##  Environment Setup

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

---

## ▶️ Run the Project

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

##  Technologies Used

* React
* Node.js
* Express
* SQLite
* TypeScript
* Google Gemini AI

---

##  Goal

The goal of this project is to demonstrate **AI integration with real business workflows**, structured outputs, and scalable architecture.




