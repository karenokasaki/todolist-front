import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      Bem vindo!
      <Link to="/todo-list">Todo-List</Link>
    </div>
  );
}

export default Home;
