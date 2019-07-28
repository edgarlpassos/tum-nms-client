import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

const propTypes = {
  defaultResolution: PropTypes.number.isRequired,
  handleResolutionChange: PropTypes.func.isRequired,
  resolutions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class VideoControls extends Component {
  constructor(props) {
    super(props);
    const { defaultResolution } = this.props;

    this.state = { resolution: defaultResolution };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    const { resolution } = this.state;
    const { handleResolutionChange } = this.props;

    if (key === resolution) return;

    this.setState({ resolution: key });
    handleResolutionChange(key);
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

  render() {
    const { resolution } = this.state;

    return (
      <div className="QualityControl">
        <Dropdown>
          <Dropdown.Toggle variant="secondary">
            {`${resolution}p`}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.renderResolutions()}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

VideoControls.propTypes = propTypes;

export default VideoControls;
