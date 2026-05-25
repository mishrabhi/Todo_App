import React, { useState } from 'react';
import { updateTodo, deleteTodo } from '../api/todoAPI';

const TodoItem = ({ todo, onUpdated, onDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description || '');
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      const result = await updateTodo(todo._id, {
        completed: !todo.completed,
      });
      if (result.success) {
        onUpdated(result.data);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editedTitle.trim()) {
      alert('Title cannot be empty');
      return;
    }
    setLoading(true);
    try {
      const result = await updateTodo(todo._id, {
        title: editedTitle,
        description: editedDescription,
      });
      if (result.success) {
        onUpdated(result.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setLoading(true);
      try {
        const result = await deleteTodo(todo._id);
        if (result.success) {
          onDeleted(todo._id);
        }
      } catch (error) {
        console.error('Error deleting todo:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const dueDate = todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No date';

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`} data-testid="todo-item">
      <div className="todo-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              data-testid="edit-title-input"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows="2"
              data-testid="edit-description-input"
            />
            <div className="edit-actions">
              <button onClick={handleSaveEdit} disabled={loading} className="save-btn">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="todo-title">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggleComplete}
                disabled={loading}
                data-testid="complete-checkbox"
              />
              <span>{todo.title}</span>
            </div>
            {todo.description && <p className="todo-description">{todo.description}</p>}
            <p className="todo-due-date">Due: {dueDate}</p>
          </div>
        )}
      </div>
      {!isEditing && (
        <div className="todo-actions">
          <button
            onClick={() => setIsEditing(true)}
            disabled={loading}
            className="edit-btn"
            data-testid="edit-btn"
          >
            Edit
          </button>
          <button onClick={handleDelete} disabled={loading} className="delete-btn">
            Delete
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
