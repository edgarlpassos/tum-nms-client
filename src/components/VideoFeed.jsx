import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Container, Spinner } from 'react-bootstrap';
import VideoItem from './VideoItem';

class VideoFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { videos: null };
  };

  static defaultProps = {
     numVideos: "5",
     owner: null, // if not sent as prop: loads videos from all users
   };

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
    filtered.sort(this.compDate);
    filtered = filtered.filter((i, index) =>
      (index < parseInt(this.props.numVideos))
    );
    return filtered
  }

  filterQuery(videos) {
    let filtered = videos;
    // if profile page:   show only videos from the user of the profile
    // else if home page: show videos from all users
    if (this.props.owner != null) {
      filtered = filtered.filter(row =>
        row.owner === parseInt(this.props.owner)
      );
    }

    filtered = this.filterNewest(filtered);
    this.setState({ videos: filtered });
  }

  renderVidFeed() {
    if (this.state.videos === null) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    else {
      return (
        <Container className="VideoFeed-container">
          {
            this.state.videos.map((video) =>
              <VideoItem id={ video.id } key={ video.id } />
          )}
        </Container>
      );
    }
  }

  render() {
    return (
      <div>
        { this.renderVidFeed() }
      </div>
    );
  }
}

export default VideoFeed;
