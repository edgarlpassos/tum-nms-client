import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from 'aws-amplify';
import { CardColumns, Container } from 'react-bootstrap';
import PreviewItem from './PreviewItem';
import Loader from './Loader';

const propTypes = {
  owner: PropTypes.number,
};

const defaultProps = {
  owner: null, // if not sent as prop: loads videos from all users
};

class PreviewFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: null,
    };
  }

  async componentDidMount() {
    const { owner } = this.props;

    try {
      let videos = await API.get('videocloud', '/videos'); // adapt to api

      if (owner != null) {
        videos = videos.filter(row => row.owner === owner);
      }
      this.setState({ videos });
    } catch (error) {
      console.error(error);
    }
  }

  renderAux() {
    const { videos } = this.state;

    if (videos === null) {
      return <Loader />;
    }

    return (
      <CardColumns>
        {videos.map(video => <PreviewItem video={video} key={video.id} />)}
      </CardColumns>
    );
  }

  render() {
    return (
      <Container className="PreviewFeed">
        {this.renderAux()}
      </Container>
    );
  }
}

PreviewFeed.propTypes = propTypes;
PreviewFeed.defaultProps = defaultProps;

export default PreviewFeed;
