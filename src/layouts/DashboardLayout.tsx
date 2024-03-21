import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { AiOutlineHome, AiOutlineFundProjectionScreen } from "react-icons/ai";
import { TbCategory,TbListDetails } from "react-icons/tb";
import { MdOutlineReviews } from "react-icons/md";
import { Layout, Menu, Button, theme, MenuProps } from "antd";
const { Header, Sider, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const items: MenuItem[] = [
  // Home Menus
  getItem('Home', 'group1', null, [getItem('Dashboard', '/dashboard', <AiOutlineHome /> )], 'group'),
  // Course Management Menus
  getItem('Course Management', 'group2', null, [ 
    getItem('Category', 'group2menu1', <TbCategory />, [
      getItem('Tom', '334x'),
    ]),
    getItem('Course', 'group2menu2', <TbListDetails />, [
      getItem('Hodadu', '534'),
    ]),
  ], 
  'group'),
  // Student Mangement Menus
  getItem('Student Management', 'group3', null, [ 
    getItem('Student Project', 'group3menu1', <AiOutlineFundProjectionScreen />, [
      getItem('Tom', '3434'),
    ]),
    getItem('Student Review', 'group3menu2', <MdOutlineReviews />, [
      getItem('Hodadu', '53434'),
    ]),
  ], 
  'group'),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

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
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          style={{ height: "100%" }}
          defaultSelectedKeys={["1"]}
          onClick={onClick}
          items={items}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          className=" shadow-sm p-0 position-fixed top-0 w-100 "
          style={{ background: colorBgContainer }}
        >
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
        </Header>
        <Content
          style={{
            margin: "10px",
            marginTop: "75px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} Created by AlphaCoder
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
