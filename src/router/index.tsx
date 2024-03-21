import { createBrowserRouter } from "react-router-dom";
// Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
// Dashboard Pages
import Home from "../pages/Dashboard/Home/Index";
import CategoryIndex from "../pages/Dashboard/Categories/Index";
import CoureseIndex from "../pages/Dashboard/Courses/Index";
import StudentProjectIndex from "../pages/Dashboard/StudentProjects/Index";
import StudnetProjectReviewIndex from "../pages/Dashboard/StudentReviews/Index";
// Auth Pages
import Login from "../pages/Auth/Login";
// Error Pages
import NotFound from "../pages/Error/NotFound";

const routes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <Home /> },
      { path: "/dashboard/categories", element: <CategoryIndex /> },
      { path: "/dashboard/courses", element: <CoureseIndex/> },
      { path: "/dashboard/student-projects", element: <StudentProjectIndex/> },
      { path: "/dashboard/studnet-project-reviews", element: <StudnetProjectReviewIndex/> }
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "login", element: <Login /> }],
  },
  { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

export default router;
