import TrainerDashboard from "@/pages/Trainer/main/Dashboard";
import MyCourses from "@/pages/Trainer/main/Courses";
import CreateNewCourse from "@/pages/Trainer/main/CreateCourse";
import TrainerQuiz from "@/pages/Trainer/main/Quiz";
const trainerRoutes = [
    // import trainerlayoout in app
    { path: "dashboard", element: <TrainerDashboard /> },
    { path: "courses", element: <MyCourses /> },
    { path: "add-course", element: <CreateNewCourse /> },
    { path: "quiz", element: <TrainerQuiz /> },
  ];
  
  export default trainerRoutes;