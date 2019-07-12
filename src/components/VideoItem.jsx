import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from 'aws-amplify';
import { Container, Spinner } from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import { getFile } from '../lib/awsLib';
import './VideoItem.css';

const propTypes = {
  id: PropTypes.number.isRequired,
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
      const { id } = this.props;
      const video = await API.get('videocloud', `/videos/${id}`);
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
      <Container className="VideoItem-container">
        <VideoPlayer url={S3url} />
        <h2>{video.name}</h2>
        <p>{`User: ${video.owner}`}</p>
        <p>{`Uploaded: ${new Date(video.createdAt).toDateString()}`}</p>
        <hr className="mt-5 mb-5" />
      </Container>
    );
  }

  render() {
    return (
      <div>
        {this.loader()}
      </div>
    );
  }
}

VideoItem.propTypes = propTypes;

export default VideoItem;
