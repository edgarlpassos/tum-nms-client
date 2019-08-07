import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { API } from 'aws-amplify';
import { Container } from 'react-bootstrap';
import PreviewFeed from '../components/PreviewFeed';
import Loader from '../components/Loader';

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
    } catch (error) {
      console.error(error);
    }
  }

  renderAux() {
    const { user } = this.state;

    if (user === null) {
      return <Loader />;
    }

    return (
      <div>
        <h1>{`Profile Page of: ${user.username}`}</h1>
        <hr className="mt-0 mb-5" />
        <PreviewFeed owner={user.id} />
      </div>
    );
  }

  render() {
    return (
      <Container className="Profile" fluid>
        {this.renderAux()}
      </Container>
    );
  }
}

Profile.propTypes = propTypes;

export default Profile;
