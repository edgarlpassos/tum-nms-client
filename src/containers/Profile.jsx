import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import VideoFeed from '../components/VideoFeed';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  };

  componentDidMount() {
    this.setState({ user: this.props.match.params.id })
  }

  render() {
    return (
      <Container className="profile-container" fluid>
        <h1>Profile Page { this.state.user }</h1>
        <hr className="mt-1 mb-5" />
        <VideoFeed owner={ this.state.user } />
      </Container>
    );
  }
}

export default Profile;
