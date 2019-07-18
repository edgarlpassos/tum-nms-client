import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    video: PropTypes.number,
    timestamp: PropTypes.number,
    created_by: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    User: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

function handleClick() {
  console.log("Todo: goto video frame at the specific timestamp");
}

function renderTimestamp(timestamp) {
  if (timestamp >= 0) {
    return (
      <span className="grey">
        Timestamp:
        <Button variant="link" onClick={handleClick}>{timestamp}</Button>
      </span>
    );
  }
  return null;
}

function CommentItem(props) {
  const { comment } = props;

  return (
    <Container className="CommentItem">
      <hr className="mt-4 mb-4" />
      <span>
        <Link to={`/profile/${comment.created_by}`} className="active bold">
          {comment.User.username}
        </Link>
        <span className="grey">{` ${new Date(comment.createdAt).toDateString()}`}</span>
      </span>
      <br />
      <p>{comment.content}</p>
      {renderTimestamp(comment.timestamp)}
    </Container>
  );
}

CommentItem.propTypes = propTypes;

export default CommentItem;
