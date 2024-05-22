import React, { useState } from 'react';

interface AddTodoProps {
  addTodo: (title: string) => void;
}

export default function AddTodo({ addTodo }: AddTodoProps) {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(e.target.value);
    setShowModal(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jobTitle) {
      setShowModal(true);
      return;
    }

    addTodo(jobTitle);
    setJobTitle('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handleSubmit}>
        <div className="form-outline flex-fill">
          <input
            type="text"
            id="form2"
            className="form-control"
            value={jobTitle}
            onChange={handleInputChange}
          />
          <label className="form-label" htmlFor="form2">
            Nhập tên công việc
          </label>
        </div>
        <button type="submit" className="btn btn-info ms-2">
          Thêm
        </button>
      </form>
      {showModal && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Cảnh báo</h5>
              <i className="fas fa-xmark" onClick={handleCloseModal} />
            </div>
            <div className="modal-body-custom">
              <p>Tên công việc không được phép để trống.</p>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-danger" onClick={handleCloseModal}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
