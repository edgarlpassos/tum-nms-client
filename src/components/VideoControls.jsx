import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown } from 'react-bootstrap';
import { API } from 'aws-amplify';

const propTypes = {
  activeComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  defaultResolution: PropTypes.number.isRequired,
  handleResolutionChange: PropTypes.func.isRequired,
  resolutions: PropTypes.arrayOf(PropTypes.string).isRequired,
  videoName: PropTypes.string.isRequired,
};

class VideoControls extends Component {
  constructor(props) {
    super(props);
    const { defaultResolution } = this.props;

    this.state = {
      loading: false,
      exportUrl: '',
      resolution: defaultResolution,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleExportVideo = this.handleExportVideo.bind(this);
  }

  handleSelect(key) {
    const { resolution } = this.state;
    const { handleResolutionChange } = this.props;

    if (key === resolution) return;

    this.setState({ resolution: key });
    handleResolutionChange(key);
  }

  async handleExportVideo() {
    this.setState({ loading: true });

    const { activeComments: comments, videoName } = this.props;
    const { resolution } = this.state;

    const videoKey = `public/outputs/${resolution}_${videoName}`;
    const { archiveUrl: exportUrl } = await API.post('videocloud', '/exportVideo', {
      body: { comments, videoKey },
    });

    this.setState({ exportUrl, loading: false });
  }

  renderResolutions() {
    const { resolutions } = this.props;

    return resolutions.map(res => (
      <Dropdown.Item
        key={res}
        eventKey={res}
        onSelect={this.handleSelect}
      >
        {`${res}p`}
      </Dropdown.Item>
    ));
  }

  renderButton() {
    const { exportUrl, loading } = this.state;

    return (
      <span>
        <Button
          onClick={this.handleExportVideo}
          variant="secondary"
        >
          {loading ? 'Loading...' : 'Export Video'}
        </Button>
        {exportUrl ? <a href={exportUrl}> Click here to download</a> : null}
      </span>
    );
  }

  render() {
    const { resolution } = this.state;

    return (
      <div className="Controls">
        <Dropdown>
          <Dropdown.Toggle variant="secondary">
            {`Quality: ${resolution}p`}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.renderResolutions()}
          </Dropdown.Menu>
        </Dropdown>
        {this.renderButton()}
      </div>
    );
  }
}

VideoControls.propTypes = propTypes;

export default VideoControls;
