import React from 'react';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;
const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };
  }
  componentDidMount() {
    videoAxios.get('/video/getVideos').then(response => {
      if (response.data.success) {
        console.log(response.data.videos);
        this.setState({ videos: response.data.videos });
      } else {
        alert('Failed to get Videos');
      }
    });
  }

  render() {
    const renderCards = this.state.videos.map((video, index) => {
      var minutes = Math.floor(video.duration / 60);
      var seconds = Math.floor(video.duration - minutes * 60);

      return (
        <Col lg={6} md={8} xs={24}>
          <div style={{ position: 'relative' }}>
            <a href={`/watch/${video.id}`}>
              <img
                style={{ width: '100%' }}
                alt="thumbnail"
                src={`http://localhost:1337/${video.thumbnail}`}
              />
              <div
                className=" duration"
                style={{
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  margin: '4px',
                  color: '#fff',
                  backgroundColor: 'rgba(17, 17, 17, 0.8)',
                  opacity: 0.8,
                  padding: '2px 4px',
                  borderRadius: '2px',
                  letterSpacing: '0.5px',
                  fontSize: '12px',
                  fontWeight: '500',
                  lineHeight: '12px',
                }}
              >
                <span>
                  {minutes} : {seconds}
                </span>
              </div>
            </a>
          </div>
          <br />
          <Meta
            avatar={<Avatar src={video.author.image} />}
            title={video.title}
          />
          <span>{video.author.name} </span>
          <br />
          <span style={{ marginLeft: '3rem' }}> {video.views}</span>
          {' views '}-{' '}
          <span> {moment(video.createdAt).format('MMM Do YYYY')} </span>
        </Col>
      );
    });

    return (
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2}> Recommended </Title>
        <hr />

        <Row gutter={16}>{renderCards}</Row>
      </div>
    );
  }
}

export default Home;
