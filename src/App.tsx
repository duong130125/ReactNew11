import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import ListTodo from './components/ListTodo';

interface Todo {
  id: number;
  title: string;
  status: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('jobs');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      status: false
    };
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (id: number, updatedTodo: Partial<Todo>) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <AddTodo addTodo={addTodo} />
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ListTodo todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
