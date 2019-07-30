import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { getFile } from '../lib/awsLib';

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

class PreviewItem extends Component {
  constructor(props) {
    super(props);

    this.state = { thumbnailUrl: '' };
  }

  async componentDidMount() {
    const { video: { location } } = this.props;
    const videoFilename = location.split('.')[0];
    const thumbnailUrl = await getFile(`thumbnails/${videoFilename}_thumbnail.png`);

    this.setState({ thumbnailUrl });
  }

  render() {
    const { video } = this.props;
    const { thumbnailUrl } = this.state;

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={thumbnailUrl} />
        <Card.Body>
          <Card.Title>
            <Link to={`/video/${video.id}`} className="active">
              {video.name}
            </Link>
          </Card.Title>
          <Card.Text>
            <Link to={`/profile/${video.owner}`} className="active bold">
              {video.User.username}
            </Link>
            <p className="grey">{`Published on: ${new Date(video.createdAt).toDateString()}`}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

PreviewItem.propTypes = propTypes;

export default PreviewItem;
