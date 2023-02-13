import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import CreateTodoForm from "../../components/CreateTodoForm";

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      const response = await api.get("/tasks");
      setTodos(response.data.data);
    }

    fetchTodos();
  }, [reload]);


  return (
    <div>
      <h1>Todo List</h1>

      <CreateTodoForm setReload={setReload} />

      <h2>Lista - Não Finalizados</h2>
      <div>
        {todos
          .filter((todo) => !todo.attributes.complete)
          .map((todo) => {
            return (
              <div key={todo.id}>
                <Link to={`/todo-list/${todo.id}`}>
                  {todo.attributes.title}
                </Link>
                <p>{todo.attributes.name}</p>
              </div>
            );
          })}
      </div>

      <h2>Lista - Finalizados</h2>
      <div>
        {todos
          .filter((todo) => todo.attributes.complete)
          .map((todo) => {
            return (
              <div key={todo.id}>
                <Link to={`/todo-list/${todo.id}`}>
                  {todo.attributes.title}
                </Link>
                <p>{todo.attributes.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TodoListPage;
