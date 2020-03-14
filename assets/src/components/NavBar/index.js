import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Layout } from 'antd';
import './Sections/Navbar.css';
import { MenuUnfoldOutlined, AlignRightOutlined } from '@ant-design/icons';
import { withContext } from '../../context/AppContext';
const { Header } = Layout;

function NavBar(props) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <Header
      className="menu"
      style={{
        position: 'fixed',
        zIndex: 5,
        width: '100%',
      }}
    >
      <MenuUnfoldOutlined className="menu__unfold" onClick={props.toggle} />
      <div className="menu__logo">
        <a href="/"> </a>
      </div>

      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <AlignRightOutlined />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </Header>
  );
}

export default withContext(NavBar);
