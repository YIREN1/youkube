import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import React from 'react';

const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar(props) {
  return (
    <Sider
      collapsedWidth={0}
      collapsible
      collapsed={props.collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        float: 'left',
        zIndex: 6,
      }}
    >
      {' '}
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item>
          <MenuFoldOutlined
            onClick={props.toggle}
            style={{ fontSize: '18px' }}
          />
        </Menu.Item>
        <Menu.Item key="1">
          <a href="/liked">
            <PieChartOutlined />
            <span>Liked videos</span>
          </a>
        </Menu.Item>
        <Menu.Item key="2">
          <a href="/yours">
            <PieChartOutlined />
            <span>Your videos</span>
          </a>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <UserOutlined />
              <span>User</span>
            </span>
          }
        >
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <TeamOutlined />
              <span>Team</span>
            </span>
          }
        >
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9">
          <FileOutlined />
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
