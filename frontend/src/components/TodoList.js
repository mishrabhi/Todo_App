import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onTodoUpdated, onTodoDeleted }) => {
  if (todos.length === 0) {
    return <div className="empty-state">No todos yet. Create one to get started!</div>;
  }

  return (
    <div className="todo-list-container">
      <h2>Todos ({todos.length})</h2>
      <ul className="todo-list" data-testid="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdated={onTodoUpdated}
            onDeleted={onTodoDeleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
