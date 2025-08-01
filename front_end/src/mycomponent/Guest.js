import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Carousel } from 'react-bootstrap';
import Sa2 from '../images/Sa2.jpg';
import Sa3 from '../images/Sa3.jpg';
import Sa4 from '../images/Sa4.jpg';
import '../Guest.css';



function Guest() {
    return (
        <div>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Query Solver</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/About">About</Nav.Link>

                        <NavDropdown title="SIGN-IN" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/check_login">Login</NavDropdown.Item>


                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

   
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={Sa2}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Query Solver</h3>
              <p> Solve your query Here</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
               className="d-block w-100 carousel-image"
              src={Sa3}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Query Solver</h3>
              <p> Solve your query Here</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
               className="d-block w-100 carousel-image"
              src={Sa4}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Query Solver</h3>
              <p>
                Solve your query Here
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    </div>
  );
    
}

export default Guest;