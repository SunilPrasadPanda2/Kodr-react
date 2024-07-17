import "./styles/index.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-datepicker/dist/react-datepicker.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUserType } from "./store/authSlice";

import Login from "@/pages/CommonPages/login/Login";
import SignupPage from "@/pages/CommonPages/signUp/signup";
import HomePage from "./pages/index";
import homeRoutes from "./routes/home.routes";

// Admin
import AdminLayout from "./pages/Admin/layout/AdminLayout";
import adminRoutes from "./routes/admin.routes";

// Trainer
import TrainerLayout from "./pages/Trainer/layout/TrainerLayout";
import trainerRoutes from "./routes/trainer.routes";

// Student
import StudentLayout from "./pages/Student/layout/StudentLayout";
import studentRoutes from "./routes/student.routes";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);
  console.log(isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          userType === "Admin" ? (
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          ) : userType === "Student" ? (
            <Route
              path="/"
              element={<Navigate to="/student/dashboard" replace />}
            />
          ) : userType === "Trainer" ? (
            <Route
              path="/"
              element={<Navigate to="/trainer/dashboard" replace />}
            />
          ) : null // No default route
        ) : (
          // Display home page with nested routes if not authenticated
          <>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Home routes */}
            <Route path="/" element={<HomePage />}>
              {homeRoutes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
            </Route>
          </>
        )}

        {/* Render admin routes */}
        {isAuthenticated && (
          <Route path="/admin/*" element={<AdminLayout />}>
            {adminRoutes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Route>
        )}
        {isAuthenticated && (
          <Route path="/trainer/*" element={<TrainerLayout />}>
            {trainerRoutes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Route>
        )}
        {isAuthenticated && (
          <Route path="/student/*" element={<StudentLayout />}>
            {studentRoutes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Route>
        )}
        {/* Redirect all other routes to home page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
