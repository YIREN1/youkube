import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
    props.commentList.map(comment => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [props.commentList, props.parentCommentId]);

  let renderReplyComment = parentCommentId =>
    props.commentList.map((comment, index) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <SingleComment
              key={index+comment.id}
              comment={comment}
              videoId={props.videoId}
              parentCommentId={parentCommentId}
              updateComment={props.updateComment}
            />
            {/* <ReplyComment
              commentList={props.commentList}
              parentCommentId={comment.id}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            /> */}
          </div>
        )}
      </>
    ));

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{ fontSize: '14px', margin: 0, color: 'gray' }}
          onClick={handleChange}
        >
          {!OpenReplyComments?'View':'Hide'} {ChildCommentNumber} replies
        </p>
      )}

      {OpenReplyComments && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
