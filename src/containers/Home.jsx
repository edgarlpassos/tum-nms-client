import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PreviewFeed from '../components/PreviewFeed';

class Home extends Component {
  render() {
    return (
      <Container className="Home" fluid>
        <h1>Home Page</h1>
        <hr className="mt-1 mb-5" />
        <PreviewFeed numVideos={100} />
      </Container>
    );
  }
}

export default Home;
