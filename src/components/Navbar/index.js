import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand as={"div"}>Ironhack</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/">
            <Nav.Link href="">Home</Nav.Link>
          </Link>
          <Link to="/todo-list">
            <Nav.Link href="">Todo List</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
