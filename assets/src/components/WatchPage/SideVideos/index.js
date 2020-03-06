import React from 'react';
import axios from 'axios';
const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});

class SideVideos extends React.Component {
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
    const SideVideoItems = this.state.videos.map((video, index) => {
      var minutes = Math.floor(video.duration / 60);
      var seconds = Math.floor(video.duration - minutes * 60);

      return (
        <div
          style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}
          key={video.id}
        >
          <div style={{ width: '40%', marginRight: '1rem' }}>
            <a href={`/watch/${video.id}`} style={{ color: 'gray' }}>
              <img
                style={{ width: '100%' }}
                src={`http://localhost:1339/${video.thumbnail}`}
                alt="thumbnail"
              />
            </a>
          </div>

          <div style={{ width: '50%' }}>
            <a href={`/watch/${video.id}`} style={{ color: 'gray' }}>
              <span style={{ fontSize: '1rem', color: 'black' }}>
                {video.title}{' '}
              </span>
              <br />
              <span>{video.author.name}</span>
              <br />
              <span>{video.views}</span>
              <br />
              <span>
                {minutes} : {seconds}
              </span>
              <br />
            </a>
          </div>
        </div>
      );
    });
    return (
      <React.Fragment>
        <div style={{ marginTop: '3rem' }}></div>
        {SideVideoItems}
      </React.Fragment>
    );
  }
}

export default SideVideos;
