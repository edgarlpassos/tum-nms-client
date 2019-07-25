import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Spinner } from 'react-bootstrap';
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

class CommentFeed extends Component {
  renderAux() {
    const { handleSeek, userId, comments } = this.props;

    if (comments === null) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    return (
      <div>
        {comments.map(comment => (
          <CommentItem handleSeek={handleSeek} comment={comment} userId={userId} key={comment.id} />
        ))}
      </div>
    );
  }

  render() {
    const {
      videoProgress,
      videoId,
      userId,
    } = this.props;

    return (
      <Container className="CommentFeed">
        { userId ? <CommentUpload videoId={videoId} videoProgress={videoProgress} /> : null}
        { this.renderAux() }
      </Container>
    );
  }
}

CommentFeed.propTypes = propTypes;
CommentFeed.defaultProps = defaultProps;

export default CommentFeed;
