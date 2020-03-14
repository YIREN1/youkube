import React, { useState } from 'react';
import { Checkbox, Button, Modal, Menu, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

const PlaylistModal = props => {
  const { visible, onCancel } = props;
  const [state, setState] = useState({
    playlists: [{ name: 'a' }, { name: 'bbb' }, { name: 'watch later' }],
    isAddingNew: false,
  });
  const onOpenForm = () => {
    setState(state => ({
      ...state,
      isAddingNew: true,
    }));
  };

  const ontoggle = () => {};
  const onFinish = values => {
    console.log('Received values from form: ', values);
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
          // onSubmit={handleSubmit}
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
            <Select
              defaultValue="Public"
              style={{ width: 120 }}
            >
              <Option value="Public">Public</Option>
              <Option value="Private">Private</Option>
              <Option value="Unlisted">Unlisted</Option>
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
