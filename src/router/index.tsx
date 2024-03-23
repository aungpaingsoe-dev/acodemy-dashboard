import { createBrowserRouter, Navigate } from "react-router-dom";
import { ReactElement } from "react";
// Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
// Dashboard Pages
import Home from "../pages/Dashboard/Home/Home";
import Category from "../pages/Dashboard/Category/Category";
import Courese from "../pages/Dashboard/Course/Course";
import StudentProject from "../pages/Dashboard/StudentProject/StudentProject";
import StudnetReview from "../pages/Dashboard/StudentReview/StudentReview";
// Auth Pages
import Login from "../pages/Auth/Login";
// Error Pages
import NotFound from "../pages/Error/NotFound";
// Cookie 
import { get } from "../utils/LocalStorage";

const dashboardMiddleware = (element : ReactElement) => {
  const token = get("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return element;
};

const authMiddleware = (element : ReactElement) => {
  const token = get("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return element;
};

const routes = [
  {
    path: "/",
    element: dashboardMiddleware( <DashboardLayout /> ),
    children: [
      { path: "/dashboard", element: <Home /> },
      { path: "/dashboard/categories", element: <Category /> },
      { path: "/dashboard/courses", element: <Courese /> },
      { path: "/dashboard/student-projects", element: <StudentProject /> },
      {
        path: "/dashboard/student-reviews",
        element: <StudnetReview />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "login", element: authMiddleware(<Login />) }],
  },
  { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

export default router;
