import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import './PreviewItem.css';

const propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    owner: PropTypes.number,
    location: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    User: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

function PreviewItem(props) {
  const { video } = props;

  return (
    <Container className="PreviewItem">
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
              {video.User.username}
            </Link>
          </p>
          <p>{`Uploaded: ${new Date(video.createdAt).toDateString()}`}</p>
        </Col>
      </Row>
      <hr className="mt-5 mb-5" />
    </Container>
  );
}

PreviewItem.propTypes = propTypes;

export default PreviewItem;
