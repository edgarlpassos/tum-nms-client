import React from 'react';
import ReactPlayer from 'react-player'

export default (props) => (
  <div className="player-wrapper" >
    <ReactPlayer
      className="react-player mx-auto"
      url={ props.url }
      loop
      controls
      width="600px"
      height="400px"
    />
  </div>
);
