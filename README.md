# MERN Todo App

A full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Overview

This is a beginner-friendly full-stack application that demonstrates:
- Full-stack integration from database to UI
- RESTful API development with Node.js and Express
- React frontend with state management
- CRUD operations on todos
- Testing with Jest and React Testing Library
- Docker containerization


## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos (with optional filter: completed, pending) |
| GET | `/api/todos/:id` | Get a specific todo |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |


## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- Docker and Docker Compose (optional, for containerized setup)
- npm or yarn

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI (default: `mongodb://localhost:27017/todoapp`)

5. Start MongoDB (ensure it's running on port 27017)

6. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:4000`

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Docker Setup (Recommended)

1. From the project root directory, build and start all services:
   ```bash
   docker-compose up --build
   ```

   This will start:
   - MongoDB on port 27017
   - Backend API on port 4000
   - Frontend on port 3000

2. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:4000/api`

3. To stop the services:
   ```bash
   docker-compose down
   ```

4. To stop and remove volumes:
   ```bash
   docker-compose down -v
   ```


