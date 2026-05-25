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

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Frontend:** React, Axios
- **Testing:** Jest, React Testing Library, Supertest
- **Deployment:** Docker, Docker Compose

## Features

- ✅ Create todos with title, description, and due date
- ✅ View all todos with filtering (All, Completed, Pending)
- ✅ Mark todos as complete/incomplete
- ✅ Edit existing todos
- ✅ Delete todos
- ✅ Real-time UI updates
- ✅ Responsive design

## Project Structure

```
ToDo_App/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB configuration
│   ├── models/
│   │   └── Todo.js            # Todo schema
│   ├── controllers/
│   │   └── todoController.js  # Business logic
│   ├── routes/
│   │   └── todoRoutes.js      # API endpoints
│   ├── middleware/
│   │   └── errorHandler.js    # Error handling
│   ├── __tests__/
│   │   └── todo.test.js       # API tests
│   ├── server.js              # Express server
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.js
│   │   │   ├── TodoList.js
│   │   │   └── TodoItem.js
│   │   ├── __tests__/
│   │   │   └── App.test.js
│   │   ├── api/
│   │   │   └── todoAPI.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── Dockerfile
│   └── public/
├── docker-compose.yml
├── POSTMAN_COLLECTION.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos (with optional filter: completed, pending) |
| GET | `/api/todos/:id` | Get a specific todo |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

### Query Parameters

- `filter=all` - Get all todos (default)
- `filter=completed` - Get only completed todos
- `filter=pending` - Get only pending todos

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- Docker and Docker Compose (optional, for containerized setup)
- npm or yarn

### Option 1: Local Setup (Without Docker)

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

### Option 2: Docker Setup (Recommended)

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

## Testing

### Backend Tests

Run Jest tests for API endpoints:
```bash
cd backend
npm test
```

Tests cover:
- GET all todos endpoint
- GET todos with filters
- POST create todo endpoint
- Health check endpoint

### Frontend Tests

Run React Testing Library tests:
```bash
cd frontend
npm test
```

Tests cover:
- App component rendering
- Filter buttons rendering
- Todo form rendering

## Using Postman

1. Import `POSTMAN_COLLECTION.json` into Postman:
   - Open Postman
   - Click Import
   - Select the `POSTMAN_COLLECTION.json` file

2. Available requests:
   - Get All Todos
   - Get Completed Todos
   - Get Pending Todos
   - Get Todo by ID
   - Create Todo
   - Update Todo
   - Mark Todo as Complete
   - Delete Todo
   - Health Check

3. Replace `:id` with actual todo IDs when testing specific endpoints

## Example API Requests

### Create a Todo

```bash
curl -X POST http://localhost:4000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, bread, eggs",
    "dueDate": "2024-06-01"
  }'
```

### Get All Todos

```bash
curl http://localhost:4000/api/todos
```

### Get Pending Todos

```bash
curl http://localhost:4000/api/todos?filter=pending
```

### Mark Todo as Complete

```bash
curl -X PUT http://localhost:4000/api/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Delete a Todo

```bash
curl -X DELETE http://localhost:4000/api/todos/{id}
```

## Development Workflow

1. **Backend Development:**
   - Modify files in `backend/`
   - Changes are hot-reloaded with nodemon
   - Test endpoints using Postman or curl

2. **Frontend Development:**
   - Modify files in `frontend/src/`
   - Changes are hot-reloaded automatically
   - Browser refreshes to reflect changes

3. **Database:**
   - MongoDB runs in a separate container
   - Data persists in `mongo-data` volume

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running on port 27017
- Check `.env` file has correct `MONGODB_URI`
- If using Docker, ensure MongoDB container is healthy

### Frontend Cannot Connect to Backend
- Check backend is running on port 5000
- Ensure CORS is enabled (should be by default)
- Check browser console for specific errors

### Port Already in Use
- Change port in `.env` or docker-compose.yml
- Or kill existing process using the port

### Docker Issues
- Run `docker-compose down -v` to clean up
- Rebuild with `docker-compose up --build`

## Production Considerations

For production deployment:

1. Set `NODE_ENV=production`
2. Use environment-specific `.env` files
3. Implement authentication/authorization
4. Add rate limiting and validation
5. Use MongoDB Atlas for cloud database
6. Deploy with cloud services (AWS, Azure, Heroku, etc.)

## Performance Tips

- Use MongoDB indexes for frequently queried fields
- Implement pagination for large todo lists
- Cache frequently accessed data
- Optimize React components with React.memo

## Future Enhancements

- User authentication and authorization
- Todo categories/tags
- Recurring todos
- Todo priority levels
- Dark mode support
- Mobile app
- Real-time updates with WebSockets
- Cloud storage integration

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.

---

**Happy coding!** 🚀
