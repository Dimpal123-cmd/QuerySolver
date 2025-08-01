import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNav from './AdminNav';
function ShowStudent() {
    const [students, setStudents] =useState([])

    useEffect (
        ()=> {
            displayStudents();

        },
       []
        
    );
    const displayStudents =async ()=> {
        try {
            const res = await axios.get('http://localhost:5000/show_students');
            setStudents(res.data);
            console.log(res.data);
        } catch(err) {
            console.log(err);  
        }
    };
    return (
        <>
        <AdminNav/>
        <div style={{
            position: 'fixed',
            top: '150px',
            left: '35%',
            transform: 'translateX(-50%)',
            width: '70%',
            zIndex: 1051,
            padding: '0.5rem',
            textAlign: 'center',
            marginLeft: '160px',
            
          }}>
            
            <div style={{ color: "black", border: "1px solid black", padding: "15px", borderRadius: "5px" }}>
               

            <h4>All Students</h4>
            <div className="row">
                <div className="col-1">Name</div>
                <div className="col-1">Enrollment</div>
                <div className="col-1">Course</div>
                <div className="col-1">Adyear</div>
                <div className="col-1">Address</div>
                <div className="col-2">Contact</div>
                <div className="col-2">Email</div>
                <div className="col-1"></div>
                <div className="col-1"></div>
               

            </div>
            {
                students.map((std)=> (
                    <div className="row" key={std.email}>
                        <div className="col-1">{std.name}</div>
                        <div className="col-1">{std.enrollment}</div>
                        <div className="col-1">{std.course}</div>
                        <div className="col-1">{std.adyear}</div>
                        <div className="col-1">{std.address}</div>
                        <div className="col-2">{std.contact}</div>
                        <div className="col-2">{std.email}</div>
                    
                        <div className="col-1">
                            <a className="btn btn-success m-1"  href={'/edit_student/'+std.email}>Edit</a>
                        </div>
                        <div className="col-1">
                            <a className="btn btn-primary m-1"  href={'/delete_student/'+std.email}>Delete</a>
                        </div>
                    </div>

                )

                )

            }


        </div>

        </div>
        </>

    );


}
export default ShowStudent;