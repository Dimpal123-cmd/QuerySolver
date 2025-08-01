import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentNav from './StudentNav';

function ShowSolution() {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/show_solutions", {
        withCredentials: true,
      });


      setSolutions(res.data);
    } catch (err) {
      console.error("Error fetching solutions:", err);
    }
  };

  return (
    <>
     <StudentNav/>
    <div
            style={{
                position: "fixed",
                top: "50px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "50%",
                maxHeight: "50vh",
                overflowY: "auto",
                zIndex: 1051,
                padding: "1rem",
                textAlign: "left",
                backgroundColor: "#e9f7ff",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                marginTop: "70px",
                height: "70%",
            }}
        >
      <h3 style={{ textAlign: "center" }}> Solutions</h3>
      {solutions.length === 0 ? (
        <p>No solutions uploaded yet.</p>
      ) : (
        solutions.map((s, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem", paddingBottom: "1rem" }}>

            <p><strong>Solution:</strong> {s.solution}</p>
            <p><strong>Solution By:</strong> {s.solutionBy}</p>
            <p><strong>Date & Time:</strong> {new Date(s.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</p>
          </div>
        ))
      )}
    </div>
    </>
  );
}

export default ShowSolution;
