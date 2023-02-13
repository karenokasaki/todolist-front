import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer>
      <Navbar bg="light" variant="light">
        <Container>
          <Row>
            <Col>
              <Link to="/">Ironhack</Link>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </footer>
  );
}
