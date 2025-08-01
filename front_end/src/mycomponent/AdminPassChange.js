import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import AdminNav from './AdminNav';

function AdminPassChange() {
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [result, setResult] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setResult("New passwords do not match.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/change_admin_password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, oldPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult("Password changed successfully.");
                setEmail("");
                setOldPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            } else {
                setResult(data.error || "Failed to change password.");
            }
        } catch (err) {
            console.error(err);
            setResult("Error changing password.");
        }
    };

    return (

        <>
        <AdminNav/>
        <div style={{
            maxWidth: "500px",
            margin: "auto",
            marginTop: "100px",
            padding: "2rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f8f9fa",
        }}>
            <h3>Change Admin Password</h3>
            <Form onSubmit={handleChangePassword}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button type="submit" variant="primary">Change Password</Button>
            </Form>
            {result && <p className="mt-3">{result}</p>}
        </div>

        </>
    );
}

export default AdminPassChange;
