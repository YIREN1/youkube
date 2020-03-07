import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import axios from 'axios';
const likeAxios = axios.create();

likeAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
function LikeDislike(props) {
  const [state, setState] = useState({
    likeCount: 0,
    dislikeCount: 0,
    isLiked: false,
    isDisliked: false,
  });
  const { videoId, commentId } = props;

  useEffect(() => {
    likeAxios
      .get('/like/getLikesCount', { params: { videoId, commentId } })
      .then(response => {
        if (response.data.success) {
          setState(state => ({
            ...state,
            dislikeCount: response.data.dislikeCount,
            likeCount: response.data.likeCount,
          }));
        } else {
          alert('Failed to get likes');
        }
      });

    likeAxios
      .get('/like/isLiked', { params: { videoId, commentId } })
      .then(response => {
        if (response.data.success) {
          setState(state => ({
            ...state,
            isLiked: response.data.type === 'like',
            isDisliked: response.data.type === 'dislike',
          }));
        } else {
          alert('Failed to get likes');
        }
      });
  }, [commentId, props.userId, props.videoId, videoId]);
  const onLike = () => {
    if (!state.isLiked) {
      likeAxios
        .post('/like/like', { videoId, commentId, type: 'like' })
        .then(response => {
          if (response.data.success) {
            setState(state => ({
              ...state,
              isLiked: true,
              likeCount: state.likeCount + 1,
            }));

            //If dislike button is already clicked

            if (state.isDisliked) {
              setState(state => ({
                ...state,
                isDisliked: false,
                dislikeCount: state.dislikeCount - 1,
              }));
            }
          } else {
            alert('Failed to increase the like');
          }
        });
    } else {
      likeAxios
        .post('/like/removeLike', { videoId, commentId })
        .then(response => {
          if (response.data.success) {
            setState(state => ({
              ...state,
              isLiked: false,
              likeCount: state.likeCount - 1,
            }));
          } else {
            alert('Failed to decrease the like');
          }
        });
    }
  };
  const onDislike = () => {
    if (!state.isDisliked) {
      likeAxios
        .post('/like/like', { videoId, commentId, type: 'dislike' })
        .then(response => {
          if (response.data.success) {
            setState(state => ({
              ...state,
              isDisliked: true,
              dislikeCount: state.dislikeCount + 1,
            }));

            //If like button is already clicked

            if (state.isLiked) {
              setState(state => ({
                ...state,
                isLiked: false,
                likeCount: state.likeCount - 1,
              }));
            }
          } else {
            alert('Failed to increase the like');
          }
        });
    } else {
      likeAxios
        .post('/like/removeLike', { videoId, commentId })
        .then(response => {
          if (response.data.success) {
            setState(state => ({
              ...state,
              isDisliked: false,
              dislikeCount: state.dislikeCount - 1,
            }));
          } else {
            alert('Failed to decrease the like');
          }
        });
    }
  };
  return (
    <React.Fragment>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={state.isLiked ? 'filled' : 'outlined'}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>
          {state.likeCount}
        </span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={state.isDisliked ? 'filled' : 'outlined'}
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>
          {state.dislikeCount}
        </span>
      </span>
    </React.Fragment>
  );
}

export default LikeDislike;
