import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="home">
        <a href="/home">Home</a>
      </Menu.Item>
      <Menu.Item key="about">
        <a href="/about">About</a>
      </Menu.Item>
      <Menu.Item key="sub">
        <a href="/subscription">Subcription</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
