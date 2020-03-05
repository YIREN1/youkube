import React from 'react';
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideos from './SideVideos';
const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
class WatchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { video: {}, videoId: props.match.params.videoId };
  }
  componentDidMount() {
    axios.get(`/video/getVideo/${this.state.videoId}`).then(response => {
      if (response.data.success) {
        console.log(response.data.video);
        this.setState({ video: response.data.video });
      } else {
        alert('Failed to get video Info');
      }
    });
  }
  render() {
    if (this.state.video.author) {
      return (
        <Row>
          <Col lg={18} xs={24}>
            <div
              className="postPage"
              style={{ width: '100%', padding: '3rem 4em' }}
            >
              <video
                style={{ width: '100%' }}
                src={`http://localhost:1338/${this.state.video.filePath}`}
                controls
              ></video>

              <List.Item
              // actions={
              //   [
              // <LikeDislikes
              //   video
              //   videoId={videoId}
              //   userId={localStorage.getItem('userId')}
              // />,
              // <Subscriber
              //   userTo={this.state.video.author.id}
              //   userFrom={localStorage.getItem('userId')}
              // />,
              //   ]
              // }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        this.state.video.writer && this.state.video.writer.image
                      }
                    />
                  }
                  title={
                    <a href="https://ant.design">{this.state.video.title}</a>
                  }
                  description={this.state.video.description}
                />
              </List.Item>

              {/* <Comments
                CommentLists={CommentLists}
                postId={this.state.video.id}
                refreshFunction={updateComment}
              /> */}
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
