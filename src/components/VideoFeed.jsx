import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from 'aws-amplify';
import { Container, Spinner } from 'react-bootstrap';
import VideoItem from './VideoItem';

const propTypes = {
  numVideos: PropTypes.number,
  owner: PropTypes.number,
};

const defaultProps = {
  numVideos: 5,
  owner: null, // if not sent as prop: loads videos from all users
};

class VideoFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: null };
  }

  async componentDidMount() {
    try {
      const videos = await API.get('videocloud', '/videos');
      this.filterQuery(videos);
    } catch (error) {
      console.error(error);
    }
  }

  compDate(a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  filterNewest(filtered) {
    const { numVideos } = this.props;
    filtered.sort(this.compDate);
    return filtered.filter((i, index) => (index < numVideos));
  }

  filterQuery(videos) {
    const { owner } = this.props;
    let filtered = videos;

    if (owner != null) {
      filtered = filtered.filter(row => row.owner === owner);
    }

    filtered = this.filterNewest(filtered);
    this.setState({ videos: filtered });
  }

  renderVidFeed() {
    const { videos } = this.state;

    if (videos === null) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    return (
      <Container className="VideoFeed-container">
        { videos.map(video => <VideoItem id={video.id} key={video.id} />) }
      </Container>
    );
  }

  render() {
    return (
      <div>
        { this.renderVidFeed() }
      </div>
    );
  }
}

VideoFeed.propTypes = propTypes;
VideoFeed.defaultProps = defaultProps;

export default VideoFeed;
