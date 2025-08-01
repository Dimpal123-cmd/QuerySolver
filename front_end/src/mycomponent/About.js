import React from "react";
import Card from "react-bootstrap/Card";
import Guest from "./Guest"; // ✅ Import Guest navbar
import "../About.css";

function About() {
    return (
        <>
            <Guest /> {/* ✅ Show navbar here */}
            <div className="about-container">
                <Card className="about-card">
                    <Card.Body>
                        <Card.Title>About Query Solver</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Query Solver</Card.Subtitle>
                        <Card.Text>
                            A "query solver project" typically refers to a project focused on optimizing or proving the equivalence of SQL queries, often involving tools like a SQL parser, a prover, and a disprover. These projects aim to improve the performance and efficiency of database interactions by ensuring the most efficient query execution plan or by verifying that different query formulations produce identical results.
                            Here's a more detailed breakdown:
                            1. SQL Query Optimization:
                            Query Optimization:
                            This process refines queries to make them faster and more efficient, especially as data scales.
                            Benefits:
                            Improved Performance: Efficient queries reduce the time it takes to retrieve data.
                            Cost Reduction: Optimized queries minimize resource consumption like CPU and memory.
                            Query Tuning: Allows for fine-tuning queries for optimal performance in complex databases.
                            Reduced Complexity: Streamlines the query execution process, improving overall system performance.
                            2. Query Equivalence Verification:
                            Provers and Disprovers:
                            Tools that verify whether two different SQL queries produce the same results under all possible database states.
                            Prover:
                            A tool that validates the equivalence of queries, potentially with false negatives (where queries are equivalent but the prover can't prove it).
                            Disprover:
                            A tool that searches for database instances where queries produce different results, potentially with false positives (where queries are inequivalent but the disprover can't find a distinguishing instance).
                          
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default About;
