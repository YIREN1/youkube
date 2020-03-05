import React from 'react';
import axios from 'axios';
import VideoList from '../VideoList';
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
    return <VideoList videos={this.state.videos} title='Recommended'/>;
  }
}

export default Home;
