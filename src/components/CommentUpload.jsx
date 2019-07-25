import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API, Auth } from 'aws-amplify';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import { formatTimestamp } from '../utils';

const propTypes = {
  videoId: PropTypes.number.isRequired,
  videoProgress: PropTypes.number,
};

const defaultProps = {
  videoProgress: 0,
};

class CommentUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formIsInvalid = this.formIsInvalid.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  async handleSubmit(event) {
    const { content } = this.state;
    const { videoId, videoProgress } = this.props;

    event.preventDefault();

    try {
      const user = await Auth.currentAuthenticatedUser();

      await API.post('videocloud', '/comments', {
        body: {
          content,
          video: videoId,
          timestamp: videoProgress,
          created_by: user.attributes['custom:id'],
        },
      });
      alert('Comment submitted');
    } catch (error) {
      alert(error);
    }
  }

  formIsInvalid() {
    const { content } = this.state;
    return content.trim().length <= 0;
  }

  render() {
    const { content } = this.state;
    const { videoProgress } = this.props;

    return (
      <Container className="CommentUpload">
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={9}>
              <Form.Group controlId="content">
                <Form.Control
                  onChange={this.handleChange}
                  value={content}
                  placeholder="Write a comment..."
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Label>{`at ${formatTimestamp(videoProgress)}`}</Form.Label>
            </Col>
          </Row>
          <Button
            block
            disabled={this.formIsInvalid()}
            type="submit"
          >
            Comment
          </Button>
        </Form>
      </Container>
    );
  }
}

CommentUpload.propTypes = propTypes;
CommentUpload.defaultProps = defaultProps;

export default CommentUpload;
