import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import CommentUpload from './CommentUpload';
import CommentItem from './CommentItem';

const propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
  handleSeek: PropTypes.func.isRequired,
  videoProgress: PropTypes.number,
  videoId: PropTypes.number.isRequired,
  userId: PropTypes.number,
};

const defaultProps = {
  userId: null,
  videoProgress: 0,
};

function CommentFeed(props) {
  const {
    comments,
    videoId,
    userId,
    handleSeek,
    videoProgress,
  } = props;

  return (
    <Container className="CommentFeed">
      { userId ? <CommentUpload videoId={videoId} videoProgress={videoProgress} /> : null}
      <div>
        {comments.map(comment => (
          <CommentItem
            handleSeek={handleSeek}
            comment={comment}
            userId={userId}
            key={comment.id}
          />
        ))}
      </div>
    </Container>
  );
}

CommentFeed.propTypes = propTypes;
CommentFeed.defaultProps = defaultProps;

export default CommentFeed;
