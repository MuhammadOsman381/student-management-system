import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./admin/adminDashboard";
import UserDashboard from "./users/userLayout";
import AdminSideBar from "./admin/adminLayout";
import CreateUsers from "./admin/Teachers/createUsers";
import CreateStudents from "./admin/Students/createStudents";
import AllUsers from "./admin/Teachers/AllUsers";
import Subjects from "./admin/subjects";
import AddTeachersSubject from "./admin/Teachers/addTeachersSubject";
import AllStudents from "./admin/Students/AllStudents";
import AddMarks from "./users/AddMarks";
import ViewStudents from "./users/viewStudents";
import Helpers from "./config/Helpers";

function App() {


  const Auth = ({ isAuth = true, isAdmin = false}) => {
    let user = Helpers.getItem("user", true);
    let token = Helpers.getItem("token");

    // let currentTime = new Date().getTime();
    // let minutesPassed = Math.floor((currentTime - loginTime) / (1000 * 60));
  
    // Check for session expiration
    // if (loginTime && minutesPassed > 1440) {
    //   localStorage.clear();
    //   Helpers.toast("error", "Session expired. Login again to continue");
    //   return <Navigate to="/login" />;
    // } 
    // For protected routes
     if (isAuth) {
      if (!user || !token) {
        toast.error("Please login to continue");
        return <Navigate to="/" />;
      }
  
      // Ensure only admins can access admin routes
      if (isAdmin && user.userType !==  true) {
        toast.error("Access denied. Only admin allowed.");
        return <Navigate to="/user/add-marks" />;
      }
  
      // Ensure admins cannot access user routes
      if (!isAdmin && user.userType === true) {
       toast.error("Access denied. Admins cannot access user routes.");
        return <Navigate to="/admin/dashboard" />;
      }

    } 
  
   
  }



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

          <Route path="/user" element={<UserDashboard />}>
          <Route path="/user/add-marks" element={<AddMarks />} />
          <Route path="/user/view-students" element={<ViewStudents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
