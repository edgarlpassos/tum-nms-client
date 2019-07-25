import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import VideoStrip from './VideoStrip';
import './VideoPlayer.css';

const propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  url: PropTypes.string.isRequired,
  videoName: PropTypes.string.isRequired,
  handleVideoProgressChange: PropTypes.func.isRequired,
};

class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      duration: 1,
    };

    this.player = null;

    this.ref = (player) => {
      this.player = player;
    };

    this.handleStripSeek = this.handleStripSeek.bind(this);
    this.handleVideoDurationChange = this.handleVideoDurationChange.bind(this);
    this.handleVideoProgressChange = this.handleVideoProgressChange.bind(this);
  }

  setProgress(seconds) {
    this.handleStripSeek(seconds);
  }

  handleStripSeek(deltaSeconds) {
    if (this.player) {
      this.player.seekTo(deltaSeconds, 'seconds');
    }
  }

  handleVideoProgressChange({ playedSeconds }) {
    const { handleVideoProgressChange: parentProgressHandler } = this.props;
    this.setState({ progress: playedSeconds });

    parentProgressHandler(Math.floor(playedSeconds));
  }

  handleVideoDurationChange(duration) {
    this.setState({ duration });
  }

  render() {
    const { url, videoName, comments } = this.props;
    const { duration, progress } = this.state;

    return (
      <Container className="VideoPlayer" fluid>
        <ReactPlayer
          ref={this.ref}
          className="react-player mx-auto"
          url={url}
          controls
          height="576px"
          width="1024px"
          progressInterval={10}
          onDuration={this.handleVideoDurationChange}
          onProgress={this.handleVideoProgressChange}
        />
        <VideoStrip
          handleSeek={this.handleStripSeek}
          videoName={videoName}
          progress={progress}
          totalLength={duration}
          comments={comments}
        />
      </Container>
    );
  }
}

VideoPlayer.propTypes = propTypes;

export default VideoPlayer;
