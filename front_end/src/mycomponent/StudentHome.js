import React, { useEffect, useState, useCallback } from 'react';

import Container from 'react-bootstrap/Container';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentNav from './StudentNav';


function StudentHome() {
  const [student, setStudent] = useState("");
  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [course, setCourse] = useState("");
  const [adyear, setAdyear] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");



  const navigate = useNavigate();
  const isUser = useCallback(async () => {
    console.log("Inside isUser function");  
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
        setStudent(res.data);
        setName(res.data.name);
        setEnrollment(res.data.enrollment);
        setCourse(res.data.course);
        setAdyear(res.data.adyear);
        setAddress(res.data.address);
        setContact(res.data.contact);
        console.log("by1"); // 
      }

    } catch (err) {
      console.log("Error in isUser:", err);
      console.log("hello1");

    }
  }, [navigate]);


  useEffect(() => {
    isUser();
    const storedStudent = localStorage.getItem("student");
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    }
  }, [isUser]);




  const handleLogout = () => {
    localStorage.removeItem("student");
    window.location.href = "/check_login";
  };


  return (
    <div>
      <StudentNav/>
      


      <div style={{
        position: 'fixed',
        top: '150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '50%',
        zIndex: 1051,
        padding: '0.5rem',
        textAlign: 'center',
        backgroundImage: 'url("../images/G4.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'black',
        borderRadius: '10px'
      }}>



        {
          student && (
            <Container className="mt-5">
              <h2>Welcome, {name}!</h2>
              <div className="mt-4">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Enrollment:</strong>{enrollment}</p>
                <p><strong>Course:</strong>{course}</p>
                <p><strong>Adyear</strong>{adyear}</p>
                <p><strong>Address:</strong> {address}</p>
                <p><strong>Contact:</strong> {contact}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <button className="btn btn-warning mt-3" onClick={() => navigate("/updateStudentProfile", {replace: true})}>
                  Edit Profile
                </button>


              </div>
            </Container>
          )
        }
      </div >
    </div >
  );
}

export default StudentHome;
