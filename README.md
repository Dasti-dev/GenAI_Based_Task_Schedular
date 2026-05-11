# AI Task Scheduler

An AI-powered intelligent scheduling system that converts natural language into structured tasks, validates schedules, resolves conflicts, and manages tasks through a modern productivity dashboard.

This project combines:

* Local LLM inference using Ollama + Phi
* NLP task parsing
* Intelligent scheduling logic
* MongoDB persistence
* React dashboard UI
* Calendar-based visualization

---

# Project Goal

Traditional task managers require manual input and rigid scheduling.

This project aims to create an AI-assisted scheduling workspace where users can simply type:

```text
Gym tomorrow morning
```

and the system:

* understands intent
* extracts structured data
* assigns a valid time slot
* checks conflicts
* stores tasks
* visualizes them on calendar

Future goal:
Turn this into a context-aware AI secretary capable of:

* schedule optimization
* behavioral learning
* travel-time awareness
* weather-aware scheduling
* adaptive rescheduling

---

# Features

## Backend

* Natural language task parsing
* Local LLM integration via Ollama
* MongoDB persistence
* Conflict detection
* Task CRUD operations
* AI-powered task interpretation
* Modular scheduler architecture

## Frontend

* Modern dark productivity dashboard
* AI task input panel
* Weekly calendar view
* Task timeline
* Smooth animations
* Loading states and skeletons
* Sidebar workspace navigation

---

# Tech Stack

## Frontend

* React
* Vite
* TailwindCSS
* shadcn/ui
* react-big-calendar
* Axios

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Axios

## AI / NLP

* Ollama
* Phi (local model)
* chrono-node

---

# Architecture

```text
Frontend (React Dashboard)
        ↓
Backend API (Express)
        ↓
LLM Service (Phi via Ollama)
        ↓
Scheduler Engine
        ↓
MongoDB Atlas
```

---

# Project Structure

```text
backend/
│
├── model/
│   └── taskModel.js
│
├── services/
│   ├── llmService.js
│   └── schedularService.js
│
├── routes.js
├── server.js
├── package.json
└── .env


frontend/
│
├── src/
│   │
│   ├── components/
│   │   ├── calendar/
│   │   ├── dashboard/
│   │   └── layout/
│   │
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

# File Responsibilities

## Backend

### `server.js`

Main backend entry point.

* starts Express server
* connects MongoDB
* registers routes
* handles errors

### `routes.js`

Defines all API routes.

* create task
* get tasks
* move/update/delete tasks

### `services/llmService.js`

Handles NLP processing.

* sends prompts to Phi model
* parses AI output
* converts natural language to JSON
* performs date extraction

### `services/schedularService.js`

Core scheduling engine.

* validates tasks
* assigns time slots
* checks conflicts
* manages updates/deletes

### `model/taskModel.js`

MongoDB schema for tasks.

---

## Frontend

### `Dashboard.jsx`

Main workspace layout.

### `Sidebar.jsx`

Workspace navigation and AI status panel.

### `AIInputBox.jsx`

Natural language task creation interface.

### `TaskList.jsx`

Displays all tasks.

### `CalendarView.jsx`

Weekly/monthly schedule visualization.

### `services/api.js`

Handles frontend-backend communication.

---

# Environment Variables

Create `.env` inside backend:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=phi:latest
```

---

# Requirements

## Software

* Node.js
* npm
* MongoDB Atlas account
* Ollama installed

## Recommended Hardware

* 8GB RAM minimum
* 16GB preferred

---

# Setup Instructions

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

---

# 3. Frontend Setup

```bash
cd frontend

npm install
```

---

# 4. Install Ollama

Download from:

[https://ollama.com](https://ollama.com)

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

Keep terminal open.

---

# 7. Run Backend

```bash
cd backend

npm run dev
```

---

# 8. Run Frontend

```bash
cd frontend

npm run dev
```

---

# API Endpoints

## Create Task

```http
POST /routes/task
```

Example:

```json
{
  "input": "Gym tomorrow morning"
}
```

---

## Get Tasks

```http
GET /routes/tasks
```

---

## Update / Move Task

```http
PUT /routes/task
```

Example:

```json
{
  "type": "move",
  "id": "TASK_ID",
  "date": "2026-05-15",
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

# Current Limitations

* Basic rule-based scheduling
* Fixed slot assignment
* Limited contextual awareness
* No authentication
* No drag-drop calendar editing
* No multi-user support

---

# Future Improvements

## AI Improvements

* Better reasoning models
* User behavior learning
* Personalized scheduling
* Habit tracking

## Scheduling Improvements

* Dynamic duration handling
* Nearest free slot suggestions
* Smart rescheduling
* Priority-based optimization

## Context Awareness

* Weather integration
* Google Maps travel-time analysis
* Calendar sync
* Location-aware scheduling

## Frontend Improvements

* Drag-drop calendar
* Toast notifications
* Task detail modals
* Analytics dashboard
* Mobile responsiveness

## Infrastructure

* Docker support
* Cloud deployment
* WebSockets
* Redis queue system

---

# Example Inputs

```text
Gym tomorrow morning
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

---

# Learning Objectives

This project demonstrates:

* AI-assisted software systems
* LLM orchestration
* backend architecture
* scheduling systems
* React dashboard design
* MongoDB integration
* local AI inference
* modular service architecture

---

# Author

Built by Billu

AI-powered intelligent scheduling workspace using local LLMs.
