import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
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
      <CreateTodoForm setReload={setReload} />

      <Container>
        <Row>
          <Col className="m-3">
            <Card bg="light" text="dark" border="danger">
              <Card.Header className="fs-4">Não Finalizados</Card.Header>
              <Card.Body>
                {todos
                  .filter((todo) => !todo.attributes.complete)
                  .map((todo) => {
                    return (
                      <Card key={todo.id} className="m-2 shadow">
                        <Link
                          to={`/todo-list/${todo.id}`}
                          style={{ textDecoration: "none", color: "grey" }}
                        >
                          <Card.Body className="fs-5">
                            {todo.attributes.title}
                          </Card.Body>
                        </Link>
                      </Card>
                    );
                  })}
              </Card.Body>
            </Card>
          </Col>

          <Col className="m-3">
            <Card bg="light" border="success">
              <Card.Header className="fs-4">Finalizados</Card.Header>
              <Card.Body>
                {todos
                  .filter((todo) => todo.attributes.complete)
                  .map((todo) => {
                    return (
                      <Card key={todo.id} className="m-2 shadow">
                        <Link
                          to={`/todo-list/${todo.id}`}
                          style={{ textDecoration: "none", color: "grey" }}
                        >
                          <Card.Body className="fs-5">
                            {todo.attributes.title}
                          </Card.Body>
                        </Link>
                      </Card>
                    );
                  })}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TodoListPage;
