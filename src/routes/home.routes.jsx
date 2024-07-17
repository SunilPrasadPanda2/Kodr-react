import CoursePage from "@/pages/Home/CoursesPage";
import AboutPage from "@/pages/Home/AboutPage";
import ContactPage from "@/pages/Home/ContactPage";
import AllCourses from "@/pages/Home/AllCourses";

const homeRoutes = [
  { path: "course/:id", element: <CoursePage /> },
  { path: "about", element: <AboutPage /> },
  { path: "contact", element: <ContactPage /> },
  { path: "all-courses", element: <AllCourses /> },
];

export default homeRoutes;
