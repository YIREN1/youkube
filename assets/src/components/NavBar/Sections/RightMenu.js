/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import { withContext } from '../../../context/AppContext';

import LoginModal from '../../Login';
import RegisterModal from '../../Register';
import UploadSteps from '../../UploadSteps';
class RightMenu extends React.Component {
  state = {
    loginVisible: false,
    registerVisible: false,
    uploadVisible: false,
  };
  showLoginModal = () => {
    this.setState({
      loginVisible: true,
    });
  };

  showRegisterModal = () => {
    this.setState({
      registerVisible: true,
    });
  };

  logoutHandler = () => {
    this.props.logout();
  };
  showUploadModal = () => {
    this.setState({
      uploadVisible: true,
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCancel = () => {
    this.setState({
      loginVisible: false,
      registerVisible: false,
      uploadVisible: false,
    });
  };
  render() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated()) {
      return (
        <Menu mode={this.props.mode}>
          <Menu.Item key="mail">
            <a onClick={this.showLoginModal}>Signin</a>
          </Menu.Item>
          <LoginModal
            visible={this.state.loginVisible}
            onCancel={this.handleCancel}
          />
          <Menu.Item key="app">
            <a onClick={this.showRegisterModal}>Signup</a>
          </Menu.Item>
          <RegisterModal
            visible={this.state.registerVisible}
            onCancel={this.handleCancel}
          />
        </Menu>
      );
    } else {
      return (
        <Menu mode={this.props.mode}>
          <Menu.Item key="upload">
            <a onClick={this.showUploadModal}>Uplaod</a>
          </Menu.Item>
          <UploadSteps
            visible={this.state.uploadVisible}
            onCancel={this.handleCancel}
          />
          <Menu.Item key="logout">
            <a onClick={this.logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
      );
    }
  }
}

export default withContext(RightMenu);
