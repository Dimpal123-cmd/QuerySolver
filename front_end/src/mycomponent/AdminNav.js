import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

function AdminNav() {

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Query Solver</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Admins" id="admin-dropdown">
                <NavDropdown.Item href="/admins">Add</NavDropdown.Item>
                <NavDropdown.Item href="/show_admins">Manage</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Students" id="student-dropdown">
                <NavDropdown.Item href="/students">Add</NavDropdown.Item>
                <NavDropdown.Item href="/show_students">Manage</NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="Logout" id="student-dropdown">
                <NavDropdown.Item href="/check_login">logout</NavDropdown.Item>

              </NavDropdown>
            </Nav>



          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>

  );
}

export default AdminNav;