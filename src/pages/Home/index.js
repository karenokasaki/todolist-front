import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <h1> Bem vindo!</h1>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>
              <Link to="/todo-list">
                <Button size="lg" variant="primary">
                  To-do List
                </Button>
              </Link>
            </Card.Title>
          </Card.Body>
          <Card.Footer>Para não esquecer nada.</Card.Footer>
        </Card>
      </Container>
    </Container>
  );
}

export default Home;
