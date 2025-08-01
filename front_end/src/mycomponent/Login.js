import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Guest from "./Guest"; // ✅ Import Guest navbar

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch("http://localhost:5000/check_login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!result.ok) {
        setMsg("Login failed: Server error.");
        return;
      }

      result = await result.json();
      if (!result || !result.usertype) {
        setMsg("Invalid Email and/or Password");
      } else {
        let ut = result.usertype;
        if (ut === "admin") {
          localStorage.setItem("admin", JSON.stringify(result));
          navigate("/admin_home", { replace: true });
        } else if (ut === "student") {
          navigate("/student_home", { replace: true });
        } else {
          setMsg("Contact to admin");
        }
      }
    } catch (err) {
      console.error("Error during login:", err);
      setMsg("Error connecting to server.");
    }
  };

  return (
    <>
      <Guest /> {/* ✅ Show navbar here */}
      <div
        style={{
          position: "fixed",
          top: "150px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "50%",
          zIndex: 1051,
          padding: "0.5rem",
          marginLeft: "10%",
        }}
      >
        <h4 className="text-primary">SignIn</h4>
        <form>
          <div className="col-6">
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="form-group mt-2">
              <button type="submit" onClick={handleOnSubmit} className="btn btn-primary px-5">Login</button>
            </div>
          </div>
        </form>
        <h3 className="text-success">{msg}</h3>
      </div>
    </>
  );
}

export default Login;
