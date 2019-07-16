import React from 'react';
import ReactPlayer from 'react-player'

export default (props) => (
  <div className="player-wrapper" >
    <ReactPlayer
      className="react-player mx-auto"
      url={ props.url }
      loop
      controls
      width="100%"
      height="100%"
    />
  </div>
);
