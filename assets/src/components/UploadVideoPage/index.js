import React from 'react';
import { Typography, Button, Form, message, Upload, Input, Icon } from 'antd';
import axios from 'axios';
import { InboxOutlined } from '@ant-design/icons';
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
    };
  }

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

  // onDrop = files => {
  //   let formData = new FormData();
  //   const config = {
  //     header: { 'content-type': 'multipart/form-data', authurization: '' },
  //   };
  //   console.log(files);
  //   formData.append('file', files[0]);

  //   videoAxios.post('/video/uploadss', formData, config).then(response => {
  //     if (response.data.success) {
  //       let variable = {
  //         filePath: response.data.filePath,
  //         fileName: response.data.fileName,
  //       };
  //       this.setState({ filePath: response.data.filePath });

  //       //gerenate thumbnail with this filepath !
  //     } else {
  //       alert('failed to save the video in server');
  //     }
  //   });
  // };

  handleUpload = async info => {
    const { status } = info.file;
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

      const thumbNailPath = await axios.post('/api/video/thumbnail', payload);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    return (
      <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2}> Upload Video</Title>
        </div>

        <Form onSubmit={this.onSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <Dropzone onDrop={this.onDrop} multiple={false} maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: '300px',
                    height: '240px',
                    border: '1px solid lightgray',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Icon type="plus" style={{ fontSize: '3rem' }} />
                </div>
              )}
            </Dropzone> */}
            <Dragger
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
            </Dragger>
            {/* {thumbnail !== "" &&
                    <div>
                        <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
                    </div>
                } */}
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
