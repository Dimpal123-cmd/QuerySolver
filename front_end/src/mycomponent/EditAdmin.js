import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import AdminNav from './AdminNav';
function EditAdmin() {
    let history = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [result, setResult] = useState("");

    useEffect(
        () => {
            console.log(id);
            displayAdmin();

        },
        []
    );

    const displayAdmin = async () => {
        let result = await fetch(
            'http://localhost:5000/get_admin', {
            method: "post",
            body: JSON.stringify({ id }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );

        result = await result.json();

        setName(result.name);
        setEmail(result.email);
        setAddress(result.address);
        setContact(result.contact);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
            'http://localhost:5000/update_admin', {
            method: "post",
            body: JSON.stringify({ name, address, contact, email }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );

        result = await result.json();
        console.warn(result);

        if (result.data === "success") {
            setResult("Data Saved Successfully");
        } else {
            setResult(result.msg);
        }
        
    }

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
            <h4 className="text-primary">Change and Save</h4>
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
                        readOnly
                       
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>


                <Button variant="primary" type="submit" onClick={handleOnSubmit}>
                    Save Changes
                </Button>
            </Form>
            {result && <h3 className="mt-3">{result}</h3>}

        </div>
        </>
    )
}
export default EditAdmin;