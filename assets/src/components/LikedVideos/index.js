import React from 'react';
import axios from 'axios';
import VideoList from '../VideoList';
const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
class likedVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { videos: [] };
  }
  componentDidMount() {
    videoAxios.get('/video/getLikedVideos').then(response => {
      if (response.data.success) {
        this.setState({ videos: response.data.likedVideos });
      } else {
        alert('Failed to get Videos');
      }
    });
  }

  render() {
    return <VideoList videos={this.state.videos} title="Liked videos" />;
  }
}

export default likedVideos;
