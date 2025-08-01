import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import StudentNav from './StudentNav';

function UploadQ() {
    const [subject, setSubject] = useState("");
    const [question, setQuestion] = useState("");
    const [student, setStudent] = useState("");

    const [result, setResult] = useState("");
 
 
   const navigate = useNavigate();
   const isUser = useCallback(async () => {
     console.log("Inside isUser function"); // 
     console.log("helo34");
 
     try {
       const res = await axios.get('http://localhost:5000/isUser', {
         withCredentials: true,
         timeout: 10000
 
 
       });
 
       console.log("Full response:", res.data); // 
 
       const ut = res.data.usertype;
 
       if (ut === "nouser") {
         navigate("/check_login", { replace: true });
       } else if (ut === "student") {
       
         setSubject(res.data.subject);
         setQuestion(res.data.question);
        
         console.log("by1"); // 
       }
 
     } catch (err) {
       console.log("Error in isUser:", err);
       console.log("hello1");
 
     }
   }, [navigate]);
 
 
   useEffect(() => {
     isUser();
     const storedStudent= localStorage.getItem("student");
     if (storedStudent) {
       setStudent(JSON.parse(storedStudent));
     }
   }, [isUser]);




    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/save_question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, question }),
                credentials: "include", // IMPORTANT
            });

            const textData = await response.text();
            const responseData = JSON.parse(textData);
            console.log(responseData);

            if (response.ok) {
                setResult("Data saved successfully");
                setSubject("");
                setQuestion("");
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
        <StudentNav/>
    <div
        style={{
            position: 'fixed',
            top: '150px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50%',
            zIndex: 1051,
            padding: '0.5rem',
            textAlign: 'center',
        }}
    >
        <h1>Upload Questions</h1>
        <Form>
            {/* Subject Field */}
            <Row className="mb-3 justify-content-center">
                <Form.Group controlId="formGridName">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        style={{ height: '50px', width: '500px', margin: '0 auto' }}
                        type="text"
                        placeholder="Enter subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </Form.Group>
            </Row>

            {/* Question Field */}
            <Row className="mb-3 justify-content-center">
                <Form.Group controlId="formGridAddress">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        as="textarea"
                        style={{ height: '150px', width: '500px', margin: '0 auto' }}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </Form.Group>
            </Row>

            {/* Submit Button */}
            <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit" onClick={handleOnSubmit}>
                    Register
                </Button>
            </div>
        </Form>

        {result && <h3 className="mt-3">{result}</h3>}
    </div>
    </>

    );
}

export default UploadQ;
