import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MdDashboard } from "react-icons/md";
import {
  Layout,
  Menu,
  Button,
  theme,
  MenuProps,
  Avatar,
  Dropdown,
} from "antd";
import menus from "../core/menus";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo } from "../features/services/auth/authSlice";
import { generateAvatorName } from "../utils/Generators";
const { Sider, Content } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userInfo = useSelector( (state : any) => state.auth?.user);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(removeUserInfo())
    window.location.reload();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div>{ userInfo?.name }</div>,
    },
    {
      key: "2",
      label: (
        <div className=" text-danger " onClick={handleLogout}>
          Logout
        </div>
      ),
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  useEffect(() => {
    let antMenuItemGroupTitle = document.querySelectorAll(
      ".ant-menu-item-group-title"
    );
    if (collapsed) {
      antMenuItemGroupTitle.forEach((item) => item.classList.add("d-none"));
    } else {
      antMenuItemGroupTitle.forEach((item) => item.classList.remove("d-none"));
    }
  }, [collapsed]);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical"></div>
        {!collapsed ? (
          <div className=" d-flex gap-2 align-items-center py-3 px-3 h5 mb-0 position-sticky top-0 z-3 bg-white">
            <MdDashboard style={{ fontSize: "30px" }} />
            Acodemy
          </div>
        ) : (
          <div className=" d-flex gap-2 align-items-center justify-content-center py-3 px-3 h5 mb-0 position-sticky top-0 z-3 bg-white">
           <MdDashboard style={{ fontSize: "30px" }} />
          </div>
        )}
        <Menu
          mode="inline"
          theme="light"
          className=" h-100 "
          defaultSelectedKeys={[location.pathname]}
          onClick={onClick}
          items={menus}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <div className="d-flex justify-content-between align-items-center pe-3">
          <div className=" d-flex align-items-center ">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Avatar
              style={{
                backgroundColor: "#000",
                verticalAlign: "middle",
                cursor: "pointer",
              }}
              size="large"
            >
              { generateAvatorName( userInfo?.name ) }
            </Avatar>
          </Dropdown>
        </div>

        <Content
          style={{
            margin: "10px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
