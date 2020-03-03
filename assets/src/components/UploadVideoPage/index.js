import React from 'react';
import { Typography, Button, Form, message, Upload, Input, Modal } from 'antd';
import axios from 'axios';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
const { Dragger } = Upload;
const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: 'Private' },
  { value: 1, label: 'Public' },
];

const Catogory = [
  { value: 0, label: 'Film & Animation' },
  { value: 0, label: 'Autos & Vehicles' },
  { value: 0, label: 'Music' },
  { value: 0, label: 'Pets & Animals' },
  { value: 0, label: 'Sports' },
];
class UploadVideoPage extends React.Component {
  constructor(props) {
    super(props);
    this.headers = {};
    const token = localStorage.getItem('token');
    this.headers.Authorization = token;

    this.state = {
      title: '',
      description: '',
      categories: '',
      privacy: '',
      filePath: '',
      duration: '',
      thumbnail: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }

  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChangeTitle = event => {
    this.setState({ title: event.currentTarget.value });
  };

  handleChangeDecsription = event => {
    console.log({ description: event.currentTarget.value });

    this.setState({ description: event.currentTarget.value });
  };

  handleChangeOne = event => {
    this.setState({ privacy: event.currentTarget.value });
  };

  handleChangeTwo = event => {
    this.setState({ categories: event.currentTarget.value });
  };

  onSubmit = () => {};

  handleUpload = async info => {
    const { status } = info.file;
    this.setState({ fileList: info.fileList });
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      const { response } = info.file;
      let payload = {
        filePath: response.filePath,
        fileName: response.fileName,
      };
      this.setState({ filePath: response.filePath });

      //gerenate thumbnail with this filepath !
      try {
        const res = await videoAxios.post('/video/thumbnail', payload);
        const { data } = res;
        if (data.success) {
          this.setState({});

          this.setState(preState => {
            const originalFileList = preState.fileList;
            originalFileList[
              originalFileList.length - 1
            ].thumbUrl = `http://localhost:1337/${data.thumbsFilePath}`;
            return {
              fileList: originalFileList,
              thumbnail: data.thumbsFilePath,
              duration: data.fileDuration,
            };
          });
        }
      } catch (error) {
        message.error(`${info.file.name} generating thumbnail failed.`);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2}> Upload Video</Title>
        </div>

        <Form onSubmit={this.onSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <Dragger
              name="file"
              multiple={true}
              action=""
              onChange={this.handleUpload}
              headers={this.headers}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger> */}
            <Upload
              action=""
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleUpload}
              headers={this.headers}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            {/* {this.state.thumbnail !== '' && (
              <div>
                <img
                  src={`http://localhost:1337/${this.state.thumbnail}`}
                  alt="haha"
                />
              </div>
            )} */}
          </div>

          <br />
          <br />
          <label>Title</label>
          <Input onChange={this.handleChangeTitle} value={this.state.title} />
          <br />
          <br />
          <label>Description</label>
          <TextArea
            onChange={this.handleChangeDecsription}
            value={this.state.description}
          />
          <br />
          <br />

          <select onChange={this.handleChangeOne}>
            {Private.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />

          <select onChange={this.handleChangeTwo}>
            {Catogory.map((item, index) => (
              <option key={index} value={item.label}>
                {item.label}
              </option>
            ))}
          </select>
          <br />
          <br />

          <Button type="primary" size="large" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default UploadVideoPage;
