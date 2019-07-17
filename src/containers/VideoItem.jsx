import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';
import { Container, Spinner } from 'react-bootstrap';
import VideoPlayer from '../components/VideoPlayer';
import { getFile } from '../lib/awsLib';
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

  loader() {
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
        <h2>{video.name}</h2>
        <p>
          User:&nbsp;
          <Link to={`/profile/${video.owner}`} className="active">
            {video.owner}
          </Link>
        </p>
        <p>{`Uploaded: ${new Date(video.createdAt).toDateString()}`}</p>
        <hr className="mt-5 mb-5" />
      </div>
    );
  }

  render() {
    return (
      <Container className="VideoItem">
        {this.loader()}
      </Container>
    );
  }
}

VideoItem.propTypes = propTypes;

export default VideoItem;
