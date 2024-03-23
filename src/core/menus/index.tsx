import { MenuProps } from "antd";
import { AiOutlineHome, AiOutlineFundProjectionScreen } from "react-icons/ai";
import { TbCategory, TbListDetails } from "react-icons/tb";
import { MdOutlineReviews } from "react-icons/md";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const menus: MenuItem[] = [
  // Home Menus
  getItem(
    "Home",
    "group1",
    null,
    [getItem("Dashboard", "/dashboard", <AiOutlineHome  style={{ fontSize: "20px" }} />)],
    "group"
  ),
  // Course Management Menus
  getItem(
    "Course Management",
    "group2",
    null,
    [
      getItem("Category", "group2menu1", <TbCategory  style={{ fontSize: "20px" }}/>, [
        getItem("List", "/dashboard/categories"),
      ]),
      getItem("Course", "group2menu2", <TbListDetails style={{ fontSize: "20px" }} />, [
        getItem("List", "/dashboard/courses"),
      ]),
    ],
    "group"
  ),
  // Student Mangement Menus
  getItem(
    "Student Management",
    "group3",
    null,
    [
      getItem(
        "Student Project",
        "group3menu1",
        <AiOutlineFundProjectionScreen style={{ fontSize: "20px" }}/>,
        [getItem("List", "/dashboard/student-projects")]
      ),
      getItem("Student Review", "group3menu2", <MdOutlineReviews style={{ fontSize: "20px" }}/>, [
        getItem("List", "/dashboard/student-reviews"),
      ]),
    ],
    "group"
  ),
];

export default menus;
