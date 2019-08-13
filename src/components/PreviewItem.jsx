import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { getFile } from '../lib/awsLib';
import { Auth } from 'aws-amplify';

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

    this.state = {
      thumbnailUrl: '',
      available: true,
      username: '',
    };

    this.handleImageError = this.handleImageError.bind(this);
  }

  async componentDidMount() {
    const { video: { location } } = this.props;
    const videoFilename = location.split('.')[0];
    const thumbnailUrl = await getFile(`thumbnails/${videoFilename}_thumbnail.png`);

    let username = '';
    try {
      username = await Auth.currentAuthenticatedUser().username;
    } catch (err) {
      // Do nothing
    }

    this.setState({ thumbnailUrl, username });
  }

  async handleImageError() {
    this.setState({ available: false });
    const thumbnailUrl = await getFile('thumbnails/kitty.png');
    this.setState({ thumbnailUrl });
  }

  renderLink() {
    const { video } = this.props;

    return (
      <Link to={`/video/${video.id}`} className="active">
        {video.name}
      </Link>
    );
  }

  render() {
    const { video } = this.props;
    const { available, thumbnailUrl, username } = this.state;

    if (!available && video.User.username !== username) return null;

    return (
      <Card style={{ width: '18rem' }} bg={available ? 'white' : 'light'}>
        <Card.Img
          variant="top"
          src={thumbnailUrl}
          onError={this.handleImageError}
        />
        <Card.Body>
          <Card.Title>
            {available ? this.renderLink() : `${video.name} - Processing`}
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
