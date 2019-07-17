import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';
import {
  Container, Col, Row, Spinner,
} from 'react-bootstrap';
import './PreviewItem.css';

const propTypes = {
  id: PropTypes.number.isRequired,
};

class PreviewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
    };
  }

  async componentDidMount() {
    try {
      const { id } = this.props;
      const video = await API.get('videocloud', `/videos/${id}`);
      this.setState({ video });
    } catch (error) {
      console.error(error);
    }
  }

  loader() {
    const { video } = this.state;

    if (video === null) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }

    return (
      <div>
        <Row>
          <Col xs lg="2">
            <pre>Thumbnail maybe?</pre>
          </Col>
          <Col md="auto">
            <Link to={`/video/${video.id}`} className="active">
              <h2>{video.name}</h2>
            </Link>
            <p>
              User:&nbsp;
              <Link to={`/profile/${video.owner}`} className="active">
                {video.owner}
              </Link>
            </p>
            <p>{`Uploaded: ${new Date(video.createdAt).toDateString()}`}</p>
          </Col>
        </Row>
        <hr className="mt-5 mb-5" />
      </div>
    );
  }

  render() {
    return (
      <Container className="PreviewItem">
        {this.loader()}
      </Container>
    );
  }
}

PreviewItem.propTypes = propTypes;

export default PreviewItem;
