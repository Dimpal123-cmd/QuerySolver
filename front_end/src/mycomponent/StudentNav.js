import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function StudentNav() {
    return (
        <div>
                <Navbar expand="lg" className="bg-body-tertiary">
                  <Container>
                    <Navbar.Brand href="/">Query Solver</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                        <NavDropdown title="Ask" id="admin-dropdown">
                          <NavDropdown.Item href="/uploadq">UploadQuestion</NavDropdown.Item>
                          <NavDropdown.Item href="/show_question">ShowAllQuestion</NavDropdown.Item>
                           <NavDropdown.Item href="/show_my_questions">ShowMyQuestion</NavDropdown.Item>
                        </NavDropdown>

                         <NavDropdown title="Solve" id="admin-dropdown">
                           <NavDropdown.Item href="/show_solutions">ShowSolution</NavDropdown.Item>
                     
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

export default StudentNav;