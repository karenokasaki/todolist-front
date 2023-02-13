import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Modal,
  Row,
  Form,
  Card,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchTodo() {
      const response = await api.get(`/tasks/${id}`);
      setTodo(response.data.data);
      setForm(response.data.data.attributes);
      setIsLoading(false);
    }
    fetchTodo();
  }, [id, reload]);

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
    setShowEdit(false);
    setReload(!reload);
  }

  async function handleStatus(e) {
    e.preventDefault();

    let obj = { data: { complete: !form.complete } };

    await api.put(`/tasks/${id}`, obj);

    setReload(!reload);
  }

  console.log(todo);

  return (
    <>
      {!isLoading && (
        <Container>
          <Card className="my-5 shadow">
            <Card.Header>
              <h1>{todo.attributes.title}</h1>
            </Card.Header>
            <Card.Body>
              <Row className="align-items-center">
                <Col className="col-4">
                  <p className="text-muted">User</p>
                  <Button variant="outline-secondary">
                    {todo.attributes.name}
                  </Button>
                  <p className="text-muted">Data Final</p>
                  <Button variant="outline-primary">
                    {todo.attributes.dueDate}
                  </Button>
                  <p className="text-muted">Status</p>
                  <Button
                    variant={
                      todo.attributes.complete ? "success" : "outline-danger"
                    }
                    onClick={handleStatus}
                  >
                    {todo.attributes.complete ? "Finalizado" : "Não finalizado"}
                  </Button>
                </Col>
                <Col className="col-8">
                  <Card bg="light" text="black">
                    <Card.Body className="text-start h-100 d-inline-block">
                      {todo.attributes.desc}
                    </Card.Body>
                  </Card>
                  <p className="text-muted text-end">
                    Criado em
                    <small> {todo.attributes.createdAt.slice(0, 10)}</small>
                  </p>
                </Col>
              </Row>
              <br></br>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/todo-list")}
                  >
                    Voltar
                  </Button>
                </Col>

                <Col>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowEdit(!showEdit)}
                  >
                    Editar
                  </Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Container>
      )}

      <Modal show={showEdit} onHide={() => setShowEdit(!showEdit)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edite sua tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Seu nome"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Título da sua nota"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="title"
                      placeholder="title"
                      value={form.title}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Descrição mais detalhada."
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  name="desc"
                  style={{ height: "100px" }}
                  placeholder="descrição"
                  value={form.desc}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text className="text-muted">Data Final</Form.Text>

              <Form.Control
                type="date"
                name="dueDate"
                placeholder="Data final"
                value={form.dueDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              name="complete"
              label="Essa tarefa foi finalizada?"
              reverse
              checked={form.complete}
              onChange={handleChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <Button variant="danger" onClick={handleDelete}>
            Deletar tarefa
          </Button>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskPage;
