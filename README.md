# 📚 Yeshiva Library Management System

A full-stack CRUD system for managing **books, students, and book loans** — built with **React (Frontend)**, **FastAPI (Backend)**, and **PostgreSQL (Database)**.  
The project includes Docker support and upcoming CI automation.

---

## 📌 Overview

This project is a **full-stack library management system** designed as a teaching/demo application for full-stack development.

It contains three major components:

### **1. Frontend (React + TypeScript)**
- Provides a UI for managing:
  - Books  
  - Students  
  - Loans  
- Uses Axios to communicate with the backend API  
- Includes routing + placeholder UI (to be improved)

### **2. Backend (FastAPI + Python)**
- Provides REST endpoints for:
  - `/books`
  - `/students`
  - `/loans`
- Handles validation, business logic, and DB communication  
- Currently uses SQLite (to be migrated to PostgreSQL)

### **3. Database (PostgreSQL)**
- Final database server for production  
- Will be containerized via Docker  
- Replaces SQLite once the migration is complete

---

## 🐳 Docker & Deployment Structure

The project will support full multi-container deployment:

- **Frontend container** → Nginx serving the React app  
- **Backend container** → FastAPI + Uvicorn  
- **Database container** → PostgreSQL  
- **docker-compose** orchestrates everything  

CI pipelines will later:
- Build + test backend  
- Build + test frontend  
- Build Docker images  
- Optionally push to Docker Hub or run tests  

---

## ✅ Tasks To Complete

Below is the full list of tasks to finalize the project.  
You can tick them off as you go.

---

### 🔧 1. Docker Improvements
- [ ] Modularize the backend Dockerfile  
- [ ] Modularize the frontend Dockerfile  
- [ ] Create production-ready Nginx config for React  
- [ ] Combine everything into a working `docker-compose.yml`  
- [ ] Ensure containers communicate properly (ports, networks)  

---

### 🧪 2. CI (Continuous Integration)
- [ ] Create GitHub Actions / GitLab CI workflows:  
  - [ ] Lint + test Backend  
  - [ ] Lint + test Frontend  
  - [ ] Build Docker images  
- [ ] Add caching for faster builds  
- [ ] Make CI fail on type errors or unit test failures  

---

### 🎨 3. Frontend — Debugging & Improvements
- [ ] Fix Axios network errors  
- [ ] Verify correct API URLs (e.g., `http://localhost:8001/books`)  
- [ ] Test:
  - [ ] Fetch books  
  - [ ] Fetch students  
  - [ ] Fetch loans  
  - [ ] Creating items  
  - [ ] Updating items  
  - [ ] Deleting items  
- [ ] Implement better error handling  
- [ ] Add responsive design + nicer layout  
- [ ] Add `.css` or a UI framework (Tailwind, Bootstrap, custom CSS)  
- [ ] Add an image of the yeshiva to the homepage  

---

### 🗃️ 4. Database Migration (SQLite → PostgreSQL)
- [ ] Set up a PostgreSQL container  
- [ ] Create tables using SQLAlchemy models or migrations  
- [ ] Update FastAPI connection strings  
- [ ] Test CRUD operations against PostgreSQL  
- [ ] Optionally add Alembic for migrations  

---

### 🚀 5. Backend — Improvements
- [ ] Add Pydantic schemas for request/response  
- [ ] Add validation (e.g., book already loaned)  
- [ ] Add missing endpoints if needed  
- [ ] Improve error responses  
- [ ] Add logging  
- [ ] Add unit tests  

---

### 📁 6. Project Quality & Structure
- [ ] Write documentation for API endpoints  
- [ ] Add screenshots/GIFs of the frontend  
- [ ] Add scripts (`npm run dev`, `poetry run start`, etc.)  
- [ ] Add sample `.env` files for users  
- [ ] Add seed/example data for easier testing  

---

## 🏗 Project Architecture (Conceptual)

```
+----------------+        +----------------+        +----------------+
|   React App    | <----> |    FastAPI     | <----> |   PostgreSQL   |
|  (Frontend)    | Axios  |   (Backend)    |   SQL  |   (Database)   |
+----------------+        +----------------+        +----------------+
```
---

## ▶️ Running (Development)

### Backend:
```bash
uvicorn main:app --reload --port 8001
```

### Frontend:
```bash
npm install
npm start
```

### Docker:
```bash
docker-compose up --build
```