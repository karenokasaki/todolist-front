import { useState } from "react";
import api from "../../api/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Col, Container, FloatingLabel, Row } from "react-bootstrap";

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
    setForm({
      name: "",
      title: "",
      dueDate: "",
      desc: "",
    });
  }

  return (
    <Container>
      <Card className="shadow my-3">
        <Card.Header className="fs-1">To do list</Card.Header>
        <Card.Body>
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
              <Col>
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
          </Form>
        </Card.Body>
        <Card.Footer>
          <Button variant="outline-success" onClick={handleSubmit}>
            Criar tarefa
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default CreateTodoForm;
