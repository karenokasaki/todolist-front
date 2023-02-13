import { useState } from "react";
import api from "../../api/api";

function CreateTodoForm({ setReload }) {
  const [form, setForm] = useState({
    name: "",
    title: "",
    dueDate: "",
    desc: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let obj = { data: { ...form } };

    await api.post(`/tasks`, obj);

    setReload((reload) => !reload);
    setForm({});
  }

  return (
    <form>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder="title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="desc"
        placeholder="descrição"
        value={form.desc}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        placeholder="Data final"
        value={form.dueDate}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Criar tarefa</button>
    </form>
  );
}

export default CreateTodoForm;
