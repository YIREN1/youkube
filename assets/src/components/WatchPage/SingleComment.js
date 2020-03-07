import React, { useState } from 'react';
import { Comment, Avatar, Input } from 'antd';
import axios from 'axios';
import LikeDislike from './LikeDislike';
const { TextArea } = Input;
const commentAxios = axios.create();

commentAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
function SingleComment(props) {
  const [CommentValue, setCommentValue] = useState('');
  const [OpenReply, setOpenReply] = useState(false);

  const handleChange = e => {
    setCommentValue(e.currentTarget.value);
  };

  const toggleReply = () => {
    if (!OpenReply && props.comment.responseTo) {
      setCommentValue(`@${props.comment.author.name} `);
    }
    setOpenReply(!OpenReply);
  };

  const onSubmit = e => {
    e.preventDefault();

    const commentPayload = {
      postId: props.videoId,
      responseTo: props.parentCommentId || props.comment.id,
      content: CommentValue,
    };

    commentAxios.post('/comment/saveComment', commentPayload).then(response => {
      if (response.data.success) {
        setCommentValue('');
        setOpenReply(!OpenReply);
        props.updateComment(response.data.savedComment);
      } else {
        alert('Failed to save Comment');
      }
    });
  };

  const actions = [
    <LikeDislike
      key={`like${props.comment.id}`}
      comment
      commentId={props.comment.id}
    />,
    <span onClick={toggleReply} key="comment-basic-reply-to">
      Reply{' '}
    </span>,
  ];

  return (
    <div>
      <Comment
        key={`c${props.comment.id}`}
        actions={actions}
        author={props.comment.author.name}
        avatar={<Avatar src={props.comment.author.image} alt="image" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>

      {OpenReply && (
        <TextArea
          key={`text${props.comment.id}`}
          autoSize={true}
          onChange={handleChange}
          value={CommentValue}
          placeholder="Add a public reply..."
          onPressEnter={onSubmit}
        />
      )}
    </div>
  );
}

export default SingleComment;
