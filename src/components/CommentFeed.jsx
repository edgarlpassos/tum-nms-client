import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from 'aws-amplify';
import { Container, Spinner } from 'react-bootstrap';
import CommentUpload from './CommentUpload';
import CommentItem from './CommentItem';

const propTypes = {
  videoID: PropTypes.number.isRequired,
};

class CommentFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: null,
    };
  }

  async componentDidMount() {
    const { videoID } = this.props;

    try {
      const comments = await API.get('videocloud', `/videos/${videoID}/comments`);
      this.setState({ comments });
    } catch (error) {
      console.error(error);
    }
  }

  renderAux() {
    const { comments } = this.state;

    if (comments === null) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    return (
      <div>
        { comments.map(comment => <CommentItem comment={comment} key={comment.id} />) }
      </div>
    );
  }

  render() {
    const { videoID } = this.props;

    return (
      <Container className="CommentFeed">
        <CommentUpload videoID={videoID} />
        { this.renderAux() }
      </Container>
    );
  }
}

CommentFeed.propTypes = propTypes;

export default CommentFeed;
