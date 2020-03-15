import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  Button,
  Modal,
  Menu,
  Input,
  Select,
  Form,
  message,
} from 'antd';
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
    playlists: [],
    isAddingNew: false,
  });
  const { videoId } = props;
  useEffect(() => {
    videoAxios.get('/playlist/getPlaylists').then(response => {
      if (response.data.success) {
        setState(state => ({
          ...state,
          playlists: response.data.playlists.map(playlist => {
            playlist.checked = playlist.videoIds.includes(videoId);
            return playlist;
          }),
        }));
      } else {
        alert('Failed to createPlaylist');
      }
    });
  }, [videoId]);

  const onOpenForm = () => {
    setState(state => ({
      ...state,
      isAddingNew: true,
    }));
  };

  const ontoggle = (playlistId, index) => {
    if (!state.playlists[index].checked) {
      videoAxios
        .post('/playlist/saveToPlaylist', { videoId, playlistId })
        .then(response => {
          if (response.data.success) {
            message.success(`successfully saved to ${state.playlists[index].name}`);
          } else {
            alert('Failed to createPlaylist');
          }
        });
    } else {
      videoAxios
        .post('/playlist/removeFromPlaylist', { videoId, playlistId })
        .then(response => {
          if (response.data.success) {
            message.success('successfully removed');
          } else {
            alert('Failed to createPlaylist');
          }
        });
    }

    setState(state => ({
      ...state,
      playlists: state.playlists.map(playlist => {
        playlist.checked = !playlist.checked;
        return playlist;
      }),
    }));
  };
  const onFinish = values => {
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

  const playlistsCheckbox = state.playlists.map((playlist, index) => {
    return (
      <div key={index}>
        <Checkbox
          defaultChecked={playlist.checked}
          onChange={() => ontoggle(playlist.id, index)}
        >
          {playlist.name}
        </Checkbox>
        <br />
        <br />
      </div>
    );
  });

  return (
    <Modal
      width={240}
      mask={true}
      visible={visible}
      title="Save to..."
      footer={null}
      onCancel={onCancel}
    >
      {playlistsCheckbox}
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
