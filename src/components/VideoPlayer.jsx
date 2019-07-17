import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

const propTypes = {
  url: PropTypes.string.isRequired,
};

export default function VideoPlayer(props) {
  const { url } = props;
  return (
    <Container className="VideoPlayer" fluid>
      <ReactPlayer
        className="react-player mx-auto"
        url={url}
        loop
        controls
        width="100%"
        height="100%"
      />
    </Container>
  );
}

VideoPlayer.propTypes = propTypes;
