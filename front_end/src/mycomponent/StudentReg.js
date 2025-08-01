import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function StudentReg() {
    const [name, setName] = useState("");
    const [enrollment, setEnrollment] = useState("");
    const [course, setCourse] = useState("");
    const [adyear, setAdyear] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setConfirmPassword] = useState("");
    const [result, setResult] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (password !== cpassword) {
            setResult("password do not match");
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/save_students', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, enrollment, course, adyear, address, contact, email, password }),
            });

            const textData = await response.text();
            const responseData = JSON.parse(textData);

            if (response.ok) {
                setResult("Data Saved Successfully");
                setName("");
                setEnrollment("");
                setCourse("");
                setAdyear("");
                setAddress("");
                setContact("");
                setEmail("");
                setPassword("");
            } else {
                setResult(responseData.error || "Failed to save data");
            }

        } catch (err) {
            console.error(err);
            setResult("Error saving data");


        }
    };
    return (
        <div
        style={{
          position: 'fixed',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50%',
          height: '70vh',             
          overflowY: 'scroll',   //scroll bar        
          zIndex: 1051,
          padding: '1rem',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          marginTop: '5%',
          backdropFilter: 'blur(50px)', // only works with transparency
          WebkitBackdropFilter: 'blur(50px)', // for Safari
        }}>
           
            <h1 >Student Registration</h1>

          

            <Form >

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control className="bg-white text-dark"

                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAddress">
                        <Form.Label>Enrollment</Form.Label>
                        <Form.Control className="bg-white text-dark"
                            type="text"
                            placeholder="Enter address"
                            value={enrollment}
                            onChange={(e) => setEnrollment(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridcourse">
                    <Form.Label>Course</Form.Label>
                    <Form.Control className="bg-white text-dark"
                        type="text"
                        placeholder="Enter mobile number"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridadyear">
                    <Form.Label>Adyear</Form.Label>
                    <Form.Control className="bg-white text-dark"
                        type="text"
                        placeholder="Enter Adyear"
                        value={adyear}
                        onChange={(e) => setAdyear(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridaddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control className="bg-white text-dark"
                        type="text"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-9" controlId="formGridcontact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control className="bg-white text-dark"
                        type="text"
                        placeholder="Enter contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control className="bg-white text-dark"
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>



                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="bg-white text-dark"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control className="bg-white text-dark"
                            type="password"
                            placeholder="Confirm Password"
                            value={cpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit" onClick={handleOnSubmit}>
                    Submit
                </Button>
            </Form>


            {result && <h3 className="mt-3">{result}</h3>}
        </div>
    );
}
export default StudentReg;