import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';
import { Container, Spinner } from 'react-bootstrap';
import { getFile } from '../lib/awsLib';
import CommentFeed from '../components/CommentFeed';
import VideoPlayer from '../components/VideoPlayer';
import './VideoItem.css';

const propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

class VideoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: null,
      S3url: null,
    };
  }

  async componentDidMount() {
    try {
      const { match } = this.props;
      const video = await API.get('videocloud', `/videos/${match.params.id}`);
      const S3url = await getFile(video.location);
      this.setState({ video, S3url });
    } catch (error) {
      console.error(error);
    }
  }

  renderAux() {
    const { video, S3url } = this.state;

    if (video === null) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    return (
      <div>
        <VideoPlayer url={S3url} />
        <h1>{video.name}</h1>
        <span>
          <Link to={`/profile/${video.owner}`} className="active bold">
            {video.User.username}
          </Link>
          <p className="grey">{`Published on: ${new Date(video.createdAt).toDateString()}`}</p>
        </span>
        <hr className="mt-0 mb-4" />
        <CommentFeed videoID={video.id} />
      </div>
    );
  }

  render() {
    return (
      <Container className="VideoItem">
        {this.renderAux()}
      </Container>
    );
  }
}

VideoItem.propTypes = propTypes;

export default VideoItem;
