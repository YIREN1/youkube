import React, { useState, useEffect } from 'react';
// import { Form } from '@ant-design/compatible';
// import '@ant-design/compatible/assets/index.css';
import { Checkbox, Button, Modal, Menu, Input, Select, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Option } = Select;
const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});

const PlaylistModal = props => {
  const { visible, onCancel } = props;
  const [state, setState] = useState({
    playlists: [{ name: 'a' }, { name: 'bbb' }, { name: 'watch later' }],
    isAddingNew: false,
  });

  useEffect(() => {
    videoAxios.get('/playlist/getPlaylists').then(response => {
      if (response.data.success) {
        setState(state => ({
          ...state,
          playlists: response.data.playlists,
        }));
      } else {
        alert('Failed to createPlaylist');
      }
    });
  }, []);

  const onOpenForm = () => {
    setState(state => ({
      ...state,
      isAddingNew: true,
    }));
  };

  const ontoggle = () => {};
  const onFinish = values => {
    console.log('Received values from form: ', values);
    videoAxios.post('/playlist/createPlaylist', values).then(response => {
      if (response.data.success) {
        setState(state => ({
          ...state,
          playlists: state.playlists.concat(response.data.savedPlaylist),
        }));
      } else {
        alert('Failed to createPlaylist');
      }
    });
  };
  return (
    <Modal
      width={240}
      mask={true}
      visible={visible}
      title="Save to..."
      footer={null}
      onCancel={onCancel}
    >
      {state.playlists.map((playlisy, index) => (
        <div key={index}>
          <Checkbox checked={true} onChange={ontoggle}>
            {playlisy.name}
          </Checkbox>
          <br />
          <br />
        </div>
      ))}
      <hr />
      {state.isAddingNew ? (
        <Form
          onFinish={onFinish}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            privacy: 'public',
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'enter playlist name...',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="privacy" label="Privacy">
            <Select defaultValue="Public" style={{ width: 120 }}>
              <Option value="public">Public</Option>
              <Option value="private">Private</Option>
              <Option value="unlisted">Unlisted</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Create
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Menu>
          <Menu.Item onClick={onOpenForm}>
            <PlusOutlined />
            Create new playlist
          </Menu.Item>
        </Menu>
      )}
    </Modal>
  );
};

export default PlaylistModal;
