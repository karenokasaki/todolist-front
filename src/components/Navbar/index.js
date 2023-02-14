import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <div className="nav-brand">Ironhack</div>
        <Nav className="me-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/todo-list" className="nav-link">
            Todo List
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
