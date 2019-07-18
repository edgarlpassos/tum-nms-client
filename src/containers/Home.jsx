import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PreviewFeed from '../components/PreviewFeed';

class Home extends Component {
  render() {
    return (
      <Container className="Home" fluid>
        <h1>Home Page</h1>
        <hr className="mt-0 mb-5" />
        <PreviewFeed />
      </Container>
    );
  }
}

export default Home;
