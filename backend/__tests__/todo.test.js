const request = require('supertest');
const app = require('../server');

describe('Todo API Endpoints', () => {
  describe('GET /api/todos', () => {
    test('should return all todos', async () => {
      const response = await request(app).get('/api/todos');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('should filter completed todos', async () => {
      const response = await request(app).get('/api/todos?filter=completed');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    });

    test('should filter pending todos', async () => {
      const response = await request(app).get('/api/todos?filter=pending');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe('POST /api/todos', () => {
    test('should create a new todo', async () => {
      const newTodo = {
        title: 'Test Todo',
        description: 'Test Description',
      };
      const response = await request(app).post('/api/todos').send(newTodo);
      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
    });

    test('should fail without title', async () => {
      const newTodo = {
        description: 'Test Description',
      };
      const response = await request(app).post('/api/todos').send(newTodo);
      expect(response.statusCode).toBe(400);
    });
  });

  describe('Health Check', () => {
    test('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('Server is running');
    });
  });
});
