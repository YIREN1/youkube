import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

class UploadVideoModal extends React.Component {
  constructor(props) {
    super(props);
    this.headers = {};
    const token = localStorage.getItem('token');
    this.headers.Authorization = token;
    this.state = {};
  }

  handleUpload = async info => {
    const { status } = info.file;
    this.setState({ fileList: info.fileList });
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      const { response } = info.file;
      this.props.handleChangeTitle(info.file.name);
      let payload = {
        filePath: response.filePath,
        fileName: response.fileName,
      };
      this.setState({ filePath: response.filePath });
      this.props.onFinish();
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  render() {
    return (
      <Dragger
        name="file"
        multiple={true}
        action="/video/upload"
        headers={this.headers}
        onChange={this.handleUpload}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    );
  }
}

export default UploadVideoModal;
