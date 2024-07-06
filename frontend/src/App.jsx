import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/adminDashboard";
import UserDashboard from "./users/userDashboard";
import AdminSideBar from "./admin/adminLayout";
import CreateUsers from "./admin/Teachers/createUsers";
import CreateStudents from "./admin/Students/createStudents";
import EditUser from "./admin/Teachers/addTeachersSubject";
import AllUsers from "./admin/Teachers/AllUsers";
import Subjects from "./admin/subjects";
import AddTeachersSubject from "./admin/Teachers/addTeachersSubject";
import AllStudents from "./admin/Students/AllStudents";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Login />}>
            {" "}
          </Route>

          <Route path="/admin" element={<AdminSideBar />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create-users" element={<CreateUsers />} />
            <Route path="/admin/create-student" element={<CreateStudents />} />
            <Route
              path="/admin/add-teachers-subject"
              element={<AddTeachersSubject />}
            />
            <Route path="/admin/all-users" element={<AllUsers />} />
            <Route path="/admin/all-students" element={<AllStudents />} />
            <Route path="/admin/subjects" element={<Subjects />} />
          </Route>

          <Route path="/user" element={<UserDashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
