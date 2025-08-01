import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StudentNav from './StudentNav';

function UploadSolution() {
  const { id } = useParams(); // Get question ID from URL
  const [question, setQuestion] = useState(null);
  const [solutionText, setSolutionText] = useState("");
  const [uploadedInfo, setUploadedInfo] = useState(null);

  useEffect(() => {
    fetchQuestionById();
  }, []);

  const fetchQuestionById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/get_question/${id}`);
      setQuestion(res.data);
    } catch (err) {
      console.error("Error fetching question:", err);
    }
  };

  const handleUploadSolution = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/upload_solution/${id}`,
        { solution: solutionText },
        { withCredentials: true }
      );

      console.log("Solution uploaded:", res.data);

      // Update question and uploaded info
      setUploadedInfo({
        solution: res.data.solution,
        solutionBy: res.data.solutionBy,
        updatedAt: res.data.updatedAt,
      });

      // Optional: refresh question data if you want to show it updated
      fetchQuestionById();
      setSolutionText(""); // Clear input after upload
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <>
      <StudentNav />
      <div
        style={{
          position: "fixed",
          top: "50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50%",
          maxHeight: "70vh",
          overflowY: "auto",
          zIndex: 1051,
          padding: "1rem",
          textAlign: "left",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(21, 1, 1, 0.2)",
          WebkitBackdropFilter: "blur(10px)",
          backdropFilter: "blur(10px)",
          marginTop: "10px",
        }}
      >
        <h3>Upload Solution</h3>
        {question ? (
          <div>
            <p><strong>Subject:</strong> {question.subject}</p>
            <p><strong>Question:</strong> {question.question}</p>
            <p><strong>Submitted By:</strong> {question.questionBy}</p>
            <p><strong>Date:</strong> {new Date(question.createdAt).toLocaleString()}</p>

            {question.solution && (
              <p><strong>Previous Solution:</strong> {question.solution}</p>
            )}

            <textarea
              rows={4}
              style={{ width: "100%", marginTop: "1rem" }}
              placeholder="Write solution here..."
              value={solutionText}
              onChange={(e) => setSolutionText(e.target.value)}
            />
            <button
              onClick={handleUploadSolution}
              disabled={!solutionText}
              style={{ marginTop: "1rem" }}
            >
              Upload Solution
            </button>

            {uploadedInfo && (
              <div style={{ marginTop: "1rem", background: "#e6ffe6", padding: "1rem", borderRadius: "5px" }}>
                <h4>✅ Solution Uploaded</h4>
                <p><strong>Solution:</strong> {uploadedInfo.solution}</p>
                <p><strong>Uploaded By:</strong> {uploadedInfo.solutionBy}</p>
                <p><strong>Uploaded At:</strong> {new Date(uploadedInfo.updatedAt).toLocaleString()}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Loading question...</p>
        )}
      </div>
    </>
  );
}

export default UploadSolution;
