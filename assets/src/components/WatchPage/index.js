import React from 'react';
import { List, Avatar, Row, Col } from 'antd';
import { FolderAddTwoTone } from '@ant-design/icons';

import axios from 'axios';
import SideVideos from './SideVideos';
import Subscribe from './Subscirbe';
import Comments from './Comments';
import LikeDislike from './LikeDislike';
import PlaylistModal from './PlaylistModal';

const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
class WatchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {},
      videoId: props.match.params.videoId,
      playlistVisible: false,
    };
  }
  componentDidMount() {
    axios.get(`/video/getVideo/${this.state.videoId}`).then(response => {
      if (response.data.success) {
        this.setState({ video: response.data.video });
      } else {
        alert('Failed to get video Info');
      }
    });
  }
  showPlaylistModal = () => {
    this.setState({
      playlistVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      playlistVisible: false,
    });
  };

  handleKeyPress = event => {
    if (event.key === 'f') {
      // todo
      let elem = document.getElementById('entire');
      if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };
  render() {
    const saveButton = (
      <div>
        <div onClick={this.showPlaylistModal}>
          <FolderAddTwoTone /> Save
        </div>
        <PlaylistModal
          visible={this.state.playlistVisible}
          onCancel={this.handleCancel}
          videoId={this.state.videoId}
        />
      </div>
    );
    if (this.state.video.author) {
      return (
        <Row>
          <Col lg={18} xs={24}>
            <div
              className="postPage"
              style={{ width: '100%', padding: '3rem 4em' }}
            >
              <video
                onKeyPress={this.handleKeyPress}
                style={{ width: '100%' }}
                src={`http://localhost:1339/${this.state.video.filePath}`}
                controls
              ></video>

              <List.Item
                actions={[
                  <LikeDislike
                    // video
                    videoId={this.state.videoId}
                  />,
                  saveButton,
                  <Subscribe userTo={this.state.video.author.id} />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        this.state.video.author && this.state.video.author.image
                      }
                    />
                  }
                  title={
                    <a href="https://ant.design">{this.state.video.title}</a>
                  }
                  description={this.state.video.description}
                />
              </List.Item>

              <Comments videoId={this.state.video.id} />
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideos />
          </Col>
        </Row>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default WatchPage;
