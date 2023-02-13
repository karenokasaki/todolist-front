import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TaskPage from "./pages/TaskPage";
import TodoListPage from "./pages/TodoListPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo-list" element={<TodoListPage />} />
        <Route path="/todo-list/:id" element={<TaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
