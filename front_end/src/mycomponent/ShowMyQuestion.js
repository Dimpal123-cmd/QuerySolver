import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentNav from './StudentNav';

function ShowMyQuestion() {
    const [myQuestions, setMyQuestions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editSubject, setEditSubject] = useState("");
    const [editQuestion, setEditQuestion] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchMyQuestions();
    }, []);

    const fetchMyQuestions = async () => {
        try {
            const res = await axios.get("http://localhost:5000/show_my_questions", {
                withCredentials: true,
            });
            setMyQuestions(res.data);
        } catch (err) {
            console.log("Error fetching your questions:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete_my_question/${id}`, {
                withCredentials: true,
            });
            fetchMyQuestions(); // Refresh
        } catch (err) {
            console.log("Error deleting question:", err);
        }
    };

    const handleEdit = (q) => {
        setEditingId(q._id);
        setEditSubject(q.subject);
        setEditQuestion(q.question);
    };

    const handleUpdate = async (id) => {
        try {
            await axios.put(
                `http://localhost:5000/update_my_question/${id}`,
                {
                    subject: editSubject,
                    question: editQuestion,
                },
                {
                    withCredentials: true,
                }
            );
            setEditingId(null);
            fetchMyQuestions();
        } catch (err) {
            console.log("Error updating question:", err);
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
            <h4 style={{ textAlign: "center" }}>My Submitted Questions</h4>
            {myQuestions.length === 0 ? (
                <p style={{ textAlign: "center" }}>No questions submitted yet.</p>
            ) : (
                myQuestions.map((q) => (
                    <div
                        key={q._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "1rem",
                            marginBottom: "1rem",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                        }}
                    >
                        {editingId === q._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editSubject}
                                    onChange={(e) => setEditSubject(e.target.value)}
                                    style={{ width: "100%", marginBottom: "0.5rem" }}
                                />
                                <textarea
                                    value={editQuestion}
                                    onChange={(e) => setEditQuestion(e.target.value)}
                                    rows={4}
                                    style={{ width: "100%", marginBottom: "0.5rem" }}
                                />
                                <button onClick={() => handleUpdate(q._id)} style={{ marginRight: "0.5rem" }}>
                                    Save
                                </button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <p><strong>Subject:</strong> {q.subject}</p>
                                <p><strong>Question:</strong> {q.question}</p>
                                <p><strong>Date & Time:</strong>{" "}
                                    {new Date(q.createdAt).toLocaleString("en-IN", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </p>

                             
                                <div style={{ marginTop: "0.5rem" }}>
                                    <button onClick={() => handleEdit(q)} style={{ marginRight: "0.5rem" }}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(q._id)}>
                                        Delete
                                    </button>

                                
                                </div>

                           
                            </>

                        )}
                    </div>
                ))
            )}
        </div>

        </>
    );
}

export default ShowMyQuestion;
