import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;
const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
function Comments(props) {
  const [state, setState] = useState({
    commentList: [],
    commentContent: '',
    commentsCount: 0,
  });
  useEffect(() => {
    videoAxios
      .get('/comment/getComments', { params: { videoId: props.videoId } })
      .then(response => {
        if (response.data.success) {
          console.log('response.data.comments', response.data.comments);
          setState(state => ({
            ...state,
            commentList: response.data.comments,
          }));
        } else {
          alert('Failed to get video Info');
        }
      });
  }, [props.videoId]);

  const handleChange = e => {
    e.persist();
    setState(state => ({ ...state, commentContent: e.target.value }));
  };
  const onSubmit = e => {
    e.preventDefault();

    const commentPayload = {
      content: state.commentContent,
      postId: props.videoId,
    };

    videoAxios.post('/comment/saveComment', commentPayload).then(response => {
      if (response.data.success) {
        setState(state => ({
          ...state,
          commentContent: '',
          commentList: state.commentList.concat([response.data.savedComment]),
        }));
      } else {
        alert('Failed to save Comment');
      }
    });
  };
  const updateComment = newComment => {
    setState(state => ({
      ...state,
      commentList: state.commentList.concat(newComment),
    }));
  };
  return (
    <div>
      <br />
      <p>{state.commentsCount} Comments</p>
      <hr />

      {state.commentList &&
        state.commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  key={comment.id}
                  comment={comment}
                  videoId={props.videoId}
                  updateComment={updateComment}
                />
                <ReplyComment
                  key={`r${comment.id}`}
                  commentList={state.commentList}
                  videoId={props.videoId}
                  parentCommentId={comment.id}
                  updateComment={updateComment}
                />
              </React.Fragment>
            ),
        )}

      <TextArea
        autoSize={true}
        value={state.commentContent}
        placeholder="Add a public comment..."
        onChange={e => handleChange(e)}
        onPressEnter={e => onSubmit(e)}
      />
    </div>
  );
}

export default Comments;
