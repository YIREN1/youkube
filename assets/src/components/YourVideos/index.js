import React from 'react';
import axios from 'axios';
import VideoList from '../VideoList';
const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
class YourVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };
  }
  componentDidMount() {
    videoAxios.get('/video/getYourVideos').then(response => {
      if (response.data.success) {
        this.setState({ videos: response.data.yourVideos });
      } else {
        alert('Failed to get Videos');
      }
    });
  }

  render() {
    return <VideoList videos={this.state.videos} title="Your videos" />;
  }
}

export default YourVideos;
