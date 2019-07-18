import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { API } from 'aws-amplify';
import { Container, Spinner } from 'react-bootstrap';
import PreviewFeed from '../components/PreviewFeed';

const propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    try {
      const { match } = this.props;
      const user = await API.get('videocloud', `/users/${match.params.id}`);

      this.setState({ user });
    } catch (e) {
      console.error(e);
    }
  }

  loader() {
    const { user } = this.state;

    if (user === null) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    return (
      <div>
        <h1>{`Profile Page of: ${user.username}`}</h1>
        <hr className="mt-1 mb-5" />
        <PreviewFeed numVideos={100} owner={user.id} />
      </div>
    );
  }

  render() {
    return (
      <Container className="Profile" fluid>
        {this.loader()}
      </Container>
    );
  }
}

Profile.propTypes = propTypes;

export default Profile;
