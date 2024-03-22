import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  MenuProps,
  Breadcrumb,
  Avatar,
  Space,
  Dropdown,
} from "antd";
import menus from "../core/menus";
const { Sider, Content } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          <div className=" text-white text-center py-3 px-3 h5 mb-0">
            Acodemy
          </div>
        ) : (
          <div className="text-white text-center py-3 px-3 h5 mb-0">A</div>
        )}
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={["/dashboard"]}
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

            <Breadcrumb
              items={[
                {
                  title: "Home",
                },
                {
                  title: <a href="">Application Center</a>,
                },
                {
                  title: <a href="">Application List</a>,
                },
                {
                  title: "An Application",
                },
              ]}
            />
          </div>
          <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Avatar
              style={{ backgroundColor: "red", verticalAlign: "middle", cursor: "pointer" }}
              size="large"
            >
              A
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
