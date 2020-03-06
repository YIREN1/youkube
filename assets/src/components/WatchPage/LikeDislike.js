import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislike() {
  const [state, setState] = useState({
    likeCount: 0,
    dislikeCount: 0,
    isLiked: false,
    isDisliked: false,
  });
  const onLike = () => {};
  const onDisLike = () => {};
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
            onClick={onDisLike}
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
