const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export const getTodos = async (filter = 'all') => {
  const url = filter === 'all' ? `${API_BASE_URL}/todos` : `${API_BASE_URL}/todos?filter=${filter}`;
  const response = await fetch(url);
  return response.json();
};

export const getTodoById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`);
  return response.json();
};

export const createTodo = async (todoData) => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  return response.json();
};

export const updateTodo = async (id, todoData) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todoData),
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
