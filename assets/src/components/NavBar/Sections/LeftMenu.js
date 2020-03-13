import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode} theme="dark">
      {/* <Menu.Item key="home">
        <a href="/home">Home</a>
      </Menu.Item>
      <Menu.Item key="sub">
        <a href="/subscription">Subcription</a>
      </Menu.Item> */}
    </Menu>
  );
}

export default LeftMenu;
