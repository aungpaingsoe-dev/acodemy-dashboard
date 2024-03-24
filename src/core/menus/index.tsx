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
    "Master Records",
    "group2",
    null,
    [
      getItem("Categories", "/dashboard/categories", <TbCategory  style={{ fontSize: "20px" }} />) , 
      getItem("Courses", "/dashboard/courses", <TbListDetails  style={{ fontSize: "20px" }} />) ,
      getItem("Student Projects", "/dashboard/student-projects", <AiOutlineFundProjectionScreen  style={{ fontSize: "20px" }} />) ,
      getItem("Student Reviews", "/dashboard/student-reviews", <MdOutlineReviews  style={{ fontSize: "20px" }} />) ,
    ],
    "group"
  ),
];

export default menus;
