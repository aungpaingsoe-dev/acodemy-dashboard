import { createBrowserRouter, Navigate } from "react-router-dom";
import { ReactElement } from "react";
// Layouts
import DashboardLayout from "../layouts/DashboardLayout";
import AuthLayout from "../layouts/AuthLayout";
// Dashboard Pages
import Home from "../pages/Dashboard/Home/Home";
import CategoryList from "../pages/Dashboard/Category/CategoryList";
import CategoryCreate from "../pages/Dashboard/Category/CategoryCreate";
import CategoryEdit from "../pages/Dashboard/Category/CategoryEdit";
import CourseList from "../pages/Dashboard/Course/CourseList";
import CourseCreate from "../pages/Dashboard/Course/CourseCreate";
import CourseEdit from "../pages/Dashboard/Course/CourseEdit";
import StudentProject from "../pages/Dashboard/StudentProject/StudentProjectList";
import StudentProjectEdit from "../pages/Dashboard/StudentProject/StudentProjectEdit";
import StudentProjectCreate from "../pages/Dashboard/StudentProject/StudentProjectCreate";
import StudnetReview from "../pages/Dashboard/StudentReview/StudentReviewList";
import StudentReviewEdit from "../pages/Dashboard/StudentReview/StudentReviewEdit";
import StudentReviewCreate from "../pages/Dashboard/StudentReview/StudentReviewCreate";
import OurTeamMember from "../pages/Dashboard/OurTeamMember/OurTeamMemberList";
import OurTeamMemberCreate from "../pages/Dashboard/OurTeamMember/OurTeamMemberCreate";
import OurTeamMemberEdit from "../pages/Dashboard/OurTeamMember/OurTeamMemberEdit";

// Auth Pages
import Login from "../pages/Auth/Login";
// Error Pages
import NotFound from "../pages/Error/NotFound";
// Cookie
import { get } from "../utils/LocalStorage";

const dashboardMiddleware = (element: ReactElement) => {
  const token = get("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  return element;
};

const authMiddleware = (element: ReactElement) => {
  const token = get("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return element;
};

const routes = [
  {
    path: "/",
    element: dashboardMiddleware(<DashboardLayout />),
    children: [
      { path: "/dashboard", element: <Home /> },
      { path: "/dashboard/categories", element: <CategoryList /> },
      { path: "/dashboard/categories-create", element: <CategoryCreate /> },
      { path: "/dashboard/categories-edit/:id", element: <CategoryEdit /> },
      { path: "/dashboard/courses", element: <CourseList /> },
      { path: "/dashboard/courses-create", element: <CourseCreate /> },
      { path: "/dashboard/courses-edit/:id", element: <CourseEdit /> },
      { path: "/dashboard/student-projects", element: <StudentProject /> },
      {
        path: "/dashboard/student-projects-edit/:id",
        element: <StudentProjectEdit />,
      },
      {
        path: "/dashboard/student-projects-create",
        element: <StudentProjectCreate />,
      },
      {
        path: "/dashboard/student-reviews",
        element: <StudnetReview />,
      },
      {
        path: "/dashboard/student-reviews-edit/:id",
        element: <StudentReviewEdit />,
      },
      {
        path: "/dashboard/student-reviews-create",
        element: <StudentReviewCreate />,
      },
      {
        path: "/dashboard/our-team-members",
        element: <OurTeamMember />,
      },
      {
        path: "/dashboard/our-team-members-edit/:id",
        element: <OurTeamMemberEdit />,
      },
      {
        path: "/dashboard/our-team-members-create",
        element: <OurTeamMemberCreate />,
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
