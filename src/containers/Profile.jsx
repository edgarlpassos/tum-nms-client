import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Container } from 'react-bootstrap';
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

  componentDidMount() {
    const { match } = this.props;
    this.setState({ user: match.params.id });
  }

  render() {
    const { user } = this.state;
    return (
      <Container className="Profile" fluid>
        <h1>{`Profile Page of user ${user}`}</h1>
        <hr className="mt-1 mb-5" />
        <PreviewFeed numVideos={100} owner={parseInt(user, 10)} />
      </Container>
    );
  }
}

Profile.propTypes = propTypes;

export default Profile;
