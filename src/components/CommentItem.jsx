import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import './CommentItem.css';
import { formatTimestamp } from '../utils';

const propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    video: PropTypes.number,
    timestamp: PropTypes.number,
    created_by: PropTypes.number,
    username: PropTypes.string,
    n_likes: PropTypes.number,
    liked: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  handleSeek: PropTypes.func.isRequired,
  userId: PropTypes.number,
};

const defaultProps = {
  userId: null,
};

class CommentItem extends Component {
  constructor(props) {
    super(props);

    const { comment } = this.props;

    this.state = {
      nLikes: comment.n_likes,
      liked: comment.liked,
    };

    this.handleClick = this.handleClick.bind(this);
    this.addLike = this.addLike.bind(this);
    this.rmLike = this.rmLike.bind(this);
  }

  handleClick() {
    const { handleSeek, comment: { timestamp } } = this.props;
    handleSeek(timestamp);
  }

  async addLike() {
    const { comment, userId } = this.props;
    const { nLikes } = this.state;

    try {
      await API.post('videocloud', '/likes', {
        body: {
          comment: comment.id,
          user: userId,
        },
      });
      this.setState({ nLikes: nLikes + 1, liked: 1 });
    } catch (error) {
      alert(error);
    }
  }

  async rmLike() {
    const { comment, userId } = this.props;
    const { nLikes } = this.state;

    try {
      await API.del('videocloud', `/likes/${comment.id}/${userId}`);
      this.setState({ nLikes: nLikes - 1, liked: 0 });
    } catch (error) {
      alert(error);
    }
  }

  renderTimestamp(timestamp) {
    return (
      <span className="grey">
        {' - timestamp:'}
        <Button variant="link" onClick={this.handleClick}>{timestamp}</Button>
      </span>
    );
  }

  renderButton() {
    const { userId } = this.props;
    if (!userId) {
      return null;
    }

    const { liked } = this.state;

    if (liked === 0) {
      return (
        <Button
          type="button"
          onClick={this.addLike}
          size="sm"
          id="like"
          className="btn btn-default like"
          aria-label="Like"
        >
          &nbsp;like&nbsp;
        </Button>
      );
    }

    return (
      <Button
        type="button"
        onClick={this.rmLike}
        size="sm"
        id="like"
        className="btn btn-default like"
        aria-label="Unlike"
      >
        unlike
      </Button>
    );
  }

  render() {
    const { comment } = this.props;
    const { nLikes } = this.state;

    return (
      <Container className="CommentItem">
        <hr className="mt-4 mb-4" />
        <span id="commentTop">
          <Link to={`/profile/${comment.created_by}`} className="active bold">
            {comment.username}
          </Link>
          <span className="grey">{` ${new Date(comment.createdAt).toDateString()}`}</span>
        </span>
        <p>
          {comment.content}
          {this.renderTimestamp(formatTimestamp(comment.timestamp))}
        </p>
        <span>
          {this.renderButton()}
          {` total: ${nLikes}`}
        </span>
      </Container>
    );
  }
}

CommentItem.propTypes = propTypes;
CommentItem.defaultProps = defaultProps;

export default CommentItem;
