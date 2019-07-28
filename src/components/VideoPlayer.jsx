import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import VideoStrip from './VideoStrip';
import VideoControls from './VideoControls';
import './VideoPlayer.css';

const propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  urls: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  videoName: PropTypes.string.isRequired,
  handleVideoProgressChange: PropTypes.func.isRequired,
  startResolution: PropTypes.number.isRequired,
};

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    const { startResolution } = this.props;

    this.state = {
      progress: 0,
      duration: 1,
      playing: false,
      resolution: startResolution,
    };

    this.player = null;

    this.ref = (player) => {
      this.player = player;
    };

    this.handleStripSeek = this.handleStripSeek.bind(this);
    this.handleResolutionChange = this.handleResolutionChange.bind(this);
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

  handleResolutionChange(resolution) {
    const { progress } = this.state;
    this.setState({ resolution, playing: true }, () => this.handleStripSeek(progress));
  }

  render() {
    const {
      urls,
      videoName,
      comments,
      startResolution,
    } = this.props;
    const {
      duration,
      playing,
      progress,
      resolution,
    } = this.state;

    return (
      <Container className="VideoPlayer" fluid>
        <VideoControls
          defaultResolution={startResolution}
          handleResolutionChange={this.handleResolutionChange}
          resolutions={Object.keys(urls)}
        />
        <ReactPlayer
          ref={this.ref}
          className="react-player mx-auto"
          url={urls[resolution]}
          controls
          playing={playing}
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
