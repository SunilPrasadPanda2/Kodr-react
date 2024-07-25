import Dashboard from "@/pages/Admin/main/Dashboard";
import Trainer from "@/pages/Admin/main/Trainers";
import AddTrainer from "@/pages/Admin/main/AddTrainer";
import Student from "@/pages/Admin/main/Students";
import AddStudent from "@/pages/Admin/main/AddStudent";
import Categoty from "@/pages/Admin/main/Categoty";
import AddCategory from "@/pages/Admin/main/AddCategory";
import Courses from "@/pages/Admin/main/Courses";
import CreateCourse from "@/pages/Admin/main/CreateCourse";
import Banners from "@/pages/Admin/main/Banners";
import Createbanner from "@/pages/Admin/main/Createbanner";
import Quiz from "@/pages/Admin/main/Quiz";
import Profile from "@/pages/CommonPages/profile_Setting/Profile";
import EditUserData from "@/pages/Admin/main/EditUserData";

const adminRoutes = [
  { path: "dashboard", element: <Dashboard /> },
  { path: "trainers", element: <Trainer /> },
  { path: "trainers/:_id", element: <EditUserData /> },
  { path: "add-trainer", element: <AddTrainer /> },
  { path: "students", element: <Student /> },
  { path: "add-student", element: <AddStudent /> },
  { path: "category", element: <Categoty /> },
  { path: "add-category", element: <AddCategory /> },
  { path: "courses", element: <Courses /> },
  { path: "add-course", element: <CreateCourse /> },
  { path: "banners", element: <Banners /> },
  { path: "add-banner", element: <Createbanner /> },
  { path: "quiz", element: <Quiz /> },
  { path: "settings", element: <Profile /> },
];

export default adminRoutes;
