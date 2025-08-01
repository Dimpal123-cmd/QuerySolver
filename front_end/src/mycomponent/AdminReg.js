import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import AdminNav from './AdminNav';

function AdminReg() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setConfirmPassword] = useState("");
    const [result, setResult] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (password !== cpassword) {
            setResult("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/save_admins', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, address, contact, email, password }),
            });

            const textData = await response.text();
            const responseData = JSON.parse(textData);

            if (response.ok) {
                setResult("Data saved successfully");
                setName("");
                setAddress("");
                setContact("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } else {
                setResult(responseData.error || "Failed to save data");
            }
        } catch (err) {
            console.error(err);
            setResult("Error saving data");
        }
    };

    return (
        <>
        <AdminNav/>
       
        <div style={{
            position: 'fixed',
            top: '150px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50%',
            zIndex: 1051,
            padding: '0.5rem',
            textAlign: 'center',
            
          }}>
             

          

           
            <h1>Admin Registration</h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
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
        </>
    );
}

export default AdminReg;
