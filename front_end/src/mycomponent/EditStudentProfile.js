import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import StudentNav from './StudentNav';

function EditStudentProfile() {
  const [student, setStudent] = useState({});

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [course, setCourse] = useState("");
  const [adyear, setAdyear] = useState("")
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get("http://localhost:5000/isUser", {
          withCredentials: true,
        });

        if (res.data.usertype !== "student") {
          navigate("/check_login", {replace: true});
        } else {
          setStudent(res.data);
          setEmail(res.data.email);
          setName(res.data.name);
          setEnrollment(res.data.enrollment);
          setCourse(res.data.course);
          setAdyear(res.data.adyear);
          setAddress(res.data.address);
          setContact(res.data.contact);
        }
      } catch (err) {
        console.error("Error fetching student:", err);
      }
    };

    fetchStudent();
  }, [navigate]);

  const handleSave = async () => {
    try {
      const updatedStudent = { name, enrollment, course, adyear,  address, contact, email: student.email };

      const res = await axios.put("http://localhost:5000/updateStudentProfile", updatedStudent, {
        withCredentials: true,
      });

      if (res.data.success) {
        alert("Profile updated successfully.");
        navigate("/student_home",{replace: true} );
      } else {
        alert("Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating profile.");
    }
  };

  return (
    <>
    <StudentNav/>
    <Container className="mt-5">
      <h2>Edit Profile</h2>
      <div className="mt-4">
        <div className="mb-3">
          <label><strong>Name:</strong></label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label><strong>Enrollment:</strong></label>
          <input type="text" className="form-control" value={enrollment} onChange={(e) => setEnrollment(e.target.value)} />
        </div>

        <div className="mb-3">
          <label><strong>Course:</strong></label>
          <input type="text" className="form-control" value={course} onChange={(e) => setCourse(e.target.value)} />
        </div>

        <div className="mb-3">
          <label><strong>Adyear:</strong></label>
          <input type="text" className="form-control" value={adyear} onChange={(e) => setAdyear(e.target.value)} />
        </div>



        <div className="mb-3">
          <label><strong>Address:</strong></label>
          <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="mb-3">
          <label><strong>Contact:</strong></label>
          <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>

        
        <div className="mb-3">
          <label><strong>Email:</strong></label>
          <input type="text"  readOnly className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
        <button className="btn btn-secondary" onClick={() => navigate("/student_home", {replace: true})}>Cancel</button>
      </div>
    </Container>
    </>
  );
}

export default EditStudentProfile;
