# TaskAI — AI-Powered Intelligent Scheduler

TaskAI is a full-stack AI-integrated productivity platform that converts natural language into intelligently scheduled tasks using local LLM inference.

Users can create schedules simply by typing commands like:

```text
Schedule gym tomorrow morning
```

The system automatically:

- interprets user intent
- extracts structured scheduling data
- validates task information
- assigns suitable time slots
- detects scheduling conflicts
- stores tasks securely
- visualizes schedules in an interactive calendar dashboard

---

# Features

# AI & NLP

- Natural language task parsing
- Local LLM integration using Ollama + Phi
- Prompt-engineered structured JSON generation
- Real-time date extraction using chrono-node
- AI-assisted scheduling workflow

# Authentication & Security

- JWT authentication
- Login & Signup system
- Protected routes
- Multi-user task isolation
- Password hashing using bcrypt
- Persistent login sessions

# Scheduling Engine

- Intelligent time slot assignment
- Conflict detection
- Task CRUD operations
- Rescheduling support
- Recurring task structure
- Priority-based tasks

# Frontend Dashboard

- Modern dark productivity UI
- Interactive calendar system
- AI scheduling input panel
- Task management dashboard
- Sidebar workspace navigation
- Persistent authentication state
- Responsive layouts

# Backend Architecture

- Modular service architecture
- REST API structure
- MongoDB persistence
- Middleware-based authentication
- Scalable scheduler design

---

# Tech Stack

# Frontend

- React
- Vite
- TailwindCSS v4
- shadcn/ui
- react-big-calendar
- Axios
- Lucide Icons

# Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Axios

# AI / NLP

- Ollama
- Phi local LLM
- chrono-node

---

# System Architecture

```text
Frontend Dashboard (React)
        ↓
REST API Layer (Express)
        ↓
JWT Authentication Middleware
        ↓
LLM Parsing Engine (Phi via Ollama)
        ↓
Scheduling Engine
        ↓
MongoDB Atlas
```

---

# Project Structure

# Backend

```text
backend/
│
├── middleware/
│   └── authMiddleware.js
│
├── model/
│   ├── taskModel.js
│   └── userModel.js
│
├── services/
│   ├── authService.js
│   ├── llmService.js
│   └── schedularService.js
│
├── utils/
│   └── generateToken.js
│
├── routes.js
├── server.js
├── package.json
└── .env
```

# Frontend

```text
frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── calendar/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── pages/
│   │   ├── Auth.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js
```

---

# Core Modules

# Backend

## `llmService.js`

Responsible for:

- prompt engineering
- communication with Phi model
- extracting structured JSON
- validating AI output
- natural language parsing

## `schedularService.js`

Core scheduling engine:

- task creation
- conflict detection
- schedule validation
- time-slot allocation
- task movement
- task deletion

## `authService.js`

Handles:

- signup logic
- login logic
- password hashing
- token generation

## `authMiddleware.js`

Protects private routes using JWT verification.

## `taskModel.js`

Stores:

- task metadata
- priority
- recurrence
- scheduling info
- user ownership

---

# Frontend

## `Auth.jsx`

Authentication UI for:

- signup
- login
- persistent session setup

## `Dashboard.jsx`

Main productivity workspace.

## `CalendarView.jsx`

Interactive schedule visualization.

## `AIInputBox.jsx`

Natural language task creation interface.

## `TaskList.jsx`

Displays all user tasks.

## `Sidebar.jsx`

Workspace navigation and AI assistant panel.

---

# Authentication Flow

```text
User Login / Signup
        ↓
JWT Token Generated
        ↓
Stored in LocalStorage
        ↓
Axios Interceptor Attaches Token
        ↓
Protected Backend Routes
        ↓
User-specific Data Access
```

---

# Environment Variables

Create `.env` inside backend:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

OLLAMA_URL=http://localhost:11434/api/generate

OLLAMA_MODEL=phi:latest

JWT_SECRET=mysecretkey
```

---

# Installation & Setup

# 1. Clone Repository

```bash
git clone <repo-url>
```

---

# 2. Backend Setup

```bash
cd backend

npm install
```

Install additional packages:

```bash
npm install bcryptjs jsonwebtoken
```

---

# 3. Frontend Setup

```bash
cd frontend

npm install
```

---

# 4. Install Ollama

Download:

```text
https://ollama.com
```

---

# 5. Pull Phi Model

```bash
ollama pull phi
```

---

# 6. Start Ollama

```bash
ollama run phi
```

Keep this terminal running.

---

# 7. Start Backend

```bash
cd backend

node server.js
```

Expected:

```text
MongoDB connected
Server running on port 5000
```

---

# 8. Start Frontend

```bash
cd frontend

npm run dev
```

---

# API Endpoints

# Authentication

## Signup

```http
POST /api/signup
```

### Request

```json
{
  "name": "Billu",
  "email": "billu@gmail.com",
  "password": "123456"
}
```

---

## Login

```http
POST /api/login
```

### Request

```json
{
  "email": "billu@gmail.com",
  "password": "123456"
}
```

---

# Task Routes

All task routes require:

```text
Authorization: Bearer TOKEN
```

---

## Create Task

```http
POST /api/task
```

### Request

```json
{
  "input": "Schedule gym tomorrow morning"
}
```

---

## Get Tasks

```http
GET /api/tasks
```

---

## Update / Move Task

```http
PUT /api/task
```

### Request

```json
{
  "type": "move",
  "id": "TASK_ID",
  "date": "2026-05-25",
  "time_preference": "evening"
}
```

---

## Delete Task

```json
{
  "type": "delete",
  "id": "TASK_ID"
}
```

---

# Example Inputs

```text
Schedule gym tomorrow morning
```

```text
Study DSA tomorrow evening
```

```text
Move gym to evening
```

```text
Delete doctor appointment
```

```text
Schedule meeting every Monday
```

---

# Current Capabilities

- AI-assisted scheduling
- Multi-user authentication
- Calendar visualization
- JWT-protected APIs
- Persistent task storage
- Conflict detection
- NLP-driven task creation

---

# Future Improvements

# AI Enhancements

- Better reasoning models
- Personalized scheduling
- User behavior learning
- Context-aware planning

# Scheduling Improvements

- Dynamic duration allocation
- Smart free-slot scanning
- Priority optimization
- Adaptive rescheduling

# Integrations

- Google Calendar sync
- Weather API integration
- Maps & travel-time analysis
- Notification systems

# Infrastructure

- Docker deployment
- Redis queue system
- WebSocket updates
- CI/CD pipelines
- Cloud hosting

# Frontend Enhancements

- Drag-and-drop calendar
- Analytics dashboard
- Task detail modals
- Mobile optimization
- Real-time updates

---

# Learning Outcomes

This project demonstrates:

- AI-assisted software engineering
- LLM orchestration
- Full-stack architecture
- Authentication systems
- REST API development
- Scheduling systems
- MongoDB schema design
- React dashboard development
- Modular backend architecture
- Local AI inference systems

---

# Author

Built by Billu

AI-powered intelligent scheduling workspace using local LLMs, modern full-stack architecture, and intelligent task orchestration.