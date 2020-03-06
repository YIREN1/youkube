import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
const { Footer } = Layout;

function myFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <p> @2020 Yi Ren All Rights reserved</p>
      <a href="https://github.com/YIREN1">
        <GithubOutlined />
      </a>
    </Footer>
  );
}

export default myFooter;
