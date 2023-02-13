import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    async function fetchTodo() {
      const response = await api.get(`/tasks/${id}`);
      setTodo(response.data.data);
      setForm(response.data.data.attributes);
      setIsLoading(false);
    }
    fetchTodo();
  }, [id]);

  async function handleDelete(e) {
    e.preventDefault();
    await api.delete(`/tasks/${id}`);
    navigate("/todo-list");
  }

  function handleChange(e) {
    if (e.target.name === "complete") {
      setForm({ ...form, [e.target.name]: e.target.checked });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let obj = { data: { ...form } };

    await api.put(`/tasks/${id}`, obj);

    navigate(`/todo-list`);
  }

  return (
    <>
      <button onClick={() => navigate("/todo-list")}>Voltar</button>
      {!isLoading && (
        <>
          <div>
            <p>{todo.attributes.name}</p>
            <p>{todo.attributes.title}</p>
            <p>{todo.attributes.desc}</p>
            <p>{todo.attributes.dueDate}</p>
            <p>{todo.attributes.complete ? "Finalizado" : "Não finalizado"}</p>
          </div>

          <button onClick={handleDelete}>Deletar</button>
          <button onClick={() => setShowEdit(!showEdit)}>Editar</button>
        </>
      )}

      {showEdit && (
        <form>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="desc"
            value={form.desc}
            onChange={handleChange}
          />
          <input
            type="checkbox"
            name="complete"
            checked={form.complete}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>Salvar Alterações</button>
        </form>
      )}
    </>
  );
}

export default TaskPage;
