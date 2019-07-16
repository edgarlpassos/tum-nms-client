import React, { Component } from 'react';
import { API, Storage } from 'aws-amplify';
import { Container, Spinner } from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import './VideoItem.css';

class VideoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      S3url: null,
    };
  };

  async componentDidMount(props) {
    try {
      const { id } = this.props;
      const data = await API.get('videocloud', `/videos/${id}`);
      this.setState({ video: data });
      this.s3loader();
    } catch (error) {
      console.error(error);
    }
  }

  async s3loader() {
    try {
      const url = await Storage.get(this.state.video.location, { level: 'private' })
      this.setState({ S3url: url });
    } catch (error) {
      console.error(error);
    }
  }

  loader() {
    if (this.state.video === null) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    else {
      return (
        <Container className="VideoItem-container">
          <VideoPlayer url={ this.state.S3url } />
          <h2>{ this.state.video.name }</h2>
          <p>User: { this.state.video.owner }</p>
          <p>Uploaded: { new Date(this.state.video.createdAt).toDateString() }</p>
          <hr className="mt-5 mb-5" />
        </Container>
      );
    }
  }

  render() {
    return (
      <div>
        { this.loader() }
      </div>
    );
  }
}

export default VideoItem;
