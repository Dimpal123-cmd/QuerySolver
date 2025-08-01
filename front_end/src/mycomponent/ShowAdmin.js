import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AdminNav from './AdminNav';

function ShowAdmin() {
    const [admins, setAdmins] = useState([]);
    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");
        if (!storedAdmin) {
          window.location.href = "/login";
        } else {
          displayAdmins();
          isUser(); 
        }
      }, []);
      
      
    
    
    
    const displayAdmins = async () => {
        try {
            const res = await axios.get('http://localhost:5000/show_admins');
            setAdmins(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    const isUser = async () => {
        try {
            const res = await axios.get('http://localhost:5000/isUser');
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    
    
    return (
        <>
        <AdminNav/>
        <div
        style={{
          position: 'fixed',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50%',
          height: '70vh',             
          overflowY: 'scroll',          
          zIndex: 1051,
          padding: '1rem',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          marginTop: '5%',
          backdropFilter: 'blur(10px)', // only works with transparency
          WebkitBackdropFilter: 'blur(10px)', 
        }}>
            <div style={{ color: "black", padding: "5px", borderRadius: "50px" }}>

                <h4>All Administrators</h4>
                <div className="row">
                    <div className="col-2">Name</div>
                    <div className="col-2">Address</div>
                    <div className="col-2">Contact</div>
                    <div className="col-2">Email</div>
                 
                    <div className="col-2"></div>
                </div>

                {
                    admins.map((adm) => (
                        <div className="row" key={adm.email}>
                            <div className="col-2">{adm.name}</div>
                            <div className="col-2">{adm.address}</div>
                            <div className="col-2">{adm.contact}</div>
                            <div className="col-2">{adm.email}</div>
                      
                            <div className="col-2">
                                <a className="btn btn-success m-1" href={'/edit_admin/' + adm.email}>Edit</a>
                            </div>
                            <div className="col-2">
                                <a className="btn btn-danger m-1" href={'/delete_admin/' + adm.email}>Delete</a>
                            </div>
                            </div>
                       
                  
            ))
            }
            </div>

        </div>
        </>
    );
}
export default ShowAdmin;