import { Layout, Menu, message } from 'antd';
import {
  PieChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
const { Sider } = Layout;

function Sidebar(props) {
  const [state, setState] = useState({
    playlists: [],
  });
  useEffect(() => {
    videoAxios.get('/playlist/getPlaylists').then(response => {
      if (response.data.success) {
        setState(state => ({
          ...state,
          playlists: response.data.playlists,
        }));
      } else {
        message.error('Failed to get playlists');
      }
    });
  }, []);
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
        {state.playlists.map((playlist, index) => (
          <Menu.Item key={index}>
            <a href={`/playlist/${playlist.id}`}>
              <MenuUnfoldOutlined />
              {playlist.name}
            </a>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default Sidebar;
