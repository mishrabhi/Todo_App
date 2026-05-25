import React, { useState } from 'react';
import { createTodo } from '../api/todoAPI';

const TodoForm = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    try {
      const result = await createTodo({
        title,
        description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      });

      if (result.success) {
        setTitle('');
        setDescription('');
        setDueDate('');
        onTodoCreated(result.data);
      } else {
        setError(result.message || 'Failed to create todo');
      }
    } catch (err) {
      setError('Error creating todo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo-form-container">
      <h2>Add New Todo</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          data-testid="title-input"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          data-testid="description-input"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          data-testid="due-date-input"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
