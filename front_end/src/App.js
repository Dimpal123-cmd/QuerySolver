import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import StudentReg from './mycomponent/StudentReg';
import ShowStudent from './mycomponent/ShowStudent';
import EditStudent from './mycomponent/EditStudent';
import DeleteStudent from './mycomponent/DeleteStudent';
import AdminHome from './mycomponent/AdminHome';
import AdminReg from './mycomponent/AdminReg';
import ShowAdmin from './mycomponent/ShowAdmin';
import EditAdmin from './mycomponent/EditAdmin';
import DeleteAdmin from './mycomponent/DeleteAdmin';
import Login from './mycomponent/Login';
import UploadQ from './mycomponent/UploadQ';
import AdminPassChange from './mycomponent/AdminPassChange';
import EditProfile from './mycomponent/EditProfile';
import ShowQ from './mycomponent/ShowQ';
import StudentHome from './mycomponent/StudentHome';
import EditStudentProfile from './mycomponent/EditStudentProfile';
import Guest from './mycomponent/Guest';
import About from './mycomponent/About';
import ShowMyQuestion from './mycomponent/ShowMyQuestion';
import UploadSolution from './mycomponent/UploadSolution';
import ShowSolution from './mycomponent/ShowSolution';


function App() {
  return (
    <Router>
     

        <Routes>
          {/* Admin Routes */}
          <Route path="/admin_home" element={<AdminHome />} />
          <Route path="/admins" element={<AdminReg />} />
          <Route path="/show_admins" element={<ShowAdmin />} />
          <Route path="/edit_admin/:id" element={<EditAdmin />} />
          <Route path="/delete_admin/:id" element={<DeleteAdmin />} />

          {/* Student Routes */}
          <Route path="/students" element={<StudentReg />} />
          <Route path="/show_students" element={<ShowStudent />} />
          <Route path="/edit_student" element={<EditStudent />} />
          <Route path="/delete_student" element={<DeleteStudent />} />
          <Route path="/student_home" element={<StudentHome />} />
          <Route path="/updateStudentProfile" element={<EditStudentProfile />} />

          {/* Login and General Routes */}
          <Route path="/" element={<Guest />} />
          <Route path="/check_login" element={<Login />} />
          <Route path="/About" element={<About />} />

          {/* Question and Solution Routes */}
          <Route path="/uploadq" element={<UploadQ />} />
          <Route path="/show_question" element={<ShowQ />} />
          <Route path="/show_my_questions" element={<ShowMyQuestion />} />
          <Route path="/upload_solution/:id" element={<UploadSolution />} />
          <Route path="/show_solutions" element={<ShowSolution />} />

          {/* Admin Profile Management */}
          <Route path="/change_admin_password" element={<AdminPassChange />} />
          <Route path="/updateAdminProfile" element={<EditProfile />} />
        </Routes>
    
    </Router>
  );
}

export default App;
