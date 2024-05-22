import React, { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  status: boolean;
}

interface ListTodoProps {
  todos: Todo[];
  updateTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
}

export default function CombinedTodoComponent({ todos, updateTodo, deleteTodo }: ListTodoProps) {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [editTitle, setEditTitle] = useState('');

  const handleCheckboxChange = (id: number) => {
    updateTodo(id, { status: !todos.find(todo => todo.id === id)?.status });
  };

  const handleEditClick = (todo: Todo) => {
    if (!todo.status) { 
      setEditingTodo(todo);
      setEditTitle(todo.title);
    }
  };

  const handleDeleteClick = (todo: Todo) => {
    setTodoToDelete(todo);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    if (todoToDelete) {
      deleteTodo(todoToDelete.id);
      setShowModal(false);
      setTodoToDelete(null);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTodoToDelete(null);
  };

  const handleEditSave = () => {
    if (editingTodo) {
      if (editTitle.trim() === '') {
        alert('Tiêu đề không được để trống');
        return;
      }
      updateTodo(editingTodo.id, { title: editTitle });
      setEditingTodo(null);
    }
  };

  const filteredTodos = activeTab === 'all'
    ? todos
    : activeTab === 'completed'
      ? todos.filter(todo => todo.status)
      : todos.filter(todo => !todo.status);

  return (
    <>
      <ul className="nav nav-tabs mb-4 pb-2">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Tất cả
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Đã hoàn thành
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'incomplete' ? 'active' : ''}`}
            onClick={() => setActiveTab('incomplete')}
          >
            Chưa hoàn thành
          </a>
        </li>
      </ul>

      <ul className="list-group mb-0">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
            style={{ backgroundColor: '#f4f6f7' }}
          >
            <div>
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={todo.status}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              {editingTodo?.id === todo.id ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              ) : (
                todo.status ? <s>{todo.title}</s> : <span>{todo.title}</span>
              )}
            </div>
            <div className="d-flex gap-3">
              {editingTodo?.id === todo.id ? (
                <button className="btn btn-success btn-sm" onClick={handleEditSave}>Lưu</button>
              ) : (
                <>
                  {!todo.status && ( 
                    <i
                      className="fas fa-pen-to-square text-warning"
                      onClick={() => handleEditClick(todo)}
                    />
                  )}
                  <i
                    className="far fa-trash-can text-danger"
                    onClick={() => handleDeleteClick(todo)}
                  />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Xác nhận</h5>
              <i className="fas fa-xmark" onClick={handleModalClose} />
            </div>
            <div className="modal-body-custom">
              <p>Bạn chắc chắn muốn xóa công việc "{todoToDelete?.title}"?</p>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={handleModalClose}>
                Hủy
              </button>
              <button className="btn btn-danger" onClick={handleDeleteConfirm}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
