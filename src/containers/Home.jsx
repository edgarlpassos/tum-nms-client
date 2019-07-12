import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import VideoFeed from '../components/VideoFeed';

class Home extends Component {
  render() {
    return (
      <Container className="home-container" fluid>
        <h1>Home Page</h1>
        <hr className="mt-1 mb-5" />
        <VideoFeed numVideos={100} />
      </Container>
    );
  }
}

export default Home;
