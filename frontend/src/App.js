import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos } from './api/todoAPI';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTodos = async (filterType = 'all') => {
    setLoading(true);
    setError('');
    try {
      const result = await getTodos(filterType);
      if (result.success) {
        setTodos(result.data);
      } else {
        setError('Failed to fetch todos');
      }
    } catch (err) {
      setError('Error fetching todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(filter);
  }, [filter]);

  const handleTodoCreated = (newTodo) => {
    if (filter === 'all' || (filter === 'pending' && !newTodo.completed)) {
      setTodos([newTodo, ...todos]);
    }
  };

  const handleTodoUpdated = (updatedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  const handleTodoDeleted = (deletedId) => {
    setTodos(todos.filter((todo) => todo._id !== deletedId));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 Todo App</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        <TodoForm onTodoCreated={handleTodoCreated} />

        <div className="filter-section">
          <h3>Filter Todos</h3>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({todos.length})
            </button>
            <button
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({pendingCount})
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList
            todos={todos}
            onTodoUpdated={handleTodoUpdated}
            onTodoDeleted={handleTodoDeleted}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>MERN Todo App © 2024</p>
      </footer>
    </div>
  );
}

export default App;
