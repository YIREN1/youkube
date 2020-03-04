import React from 'react';
import { Typography, Button, Form, message, Upload, Input, Modal } from 'antd';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import './style.css';
const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
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
class UploadVideoDetailsPage extends React.Component {
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
    if (file.type === 'video/mp4') {
      file.preview = file.thumbUrl;
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

  onSubmit = async event => {
    event.preventDefault();
    const { title, description, categories, privacy } = this.state;

    if (
      title === '' ||
      description === '' ||
      categories === '' ||
      privacy === ''
    ) {
      return alert('Please first fill all the fields');
    }
    const payload = {};

    const response = await axios.post('/api/video/uploadVideo', payload);

    if (response.data.success) {
      alert('video Uploaded Successfully');
      // props.history.push('/');
    } else {
      alert('Failed to upload video');
    }
  };

  getThumbnailsForVideo = async () => {
    const payload = {};
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
  };

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
    const { visible, onCancel } = this.props;

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2}> Details </Title>
          </div>

          <Form onSubmit={this.onSubmit}>
            <label>ThumbNails</label>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
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

export default UploadVideoDetailsPage;
