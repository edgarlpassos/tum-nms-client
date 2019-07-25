import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { API, Auth } from 'aws-amplify';
import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';

const propTypes = {
  videoId: PropTypes.number.isRequired,
};

class CommentUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      timestamp: '',
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

  defaultTimestamp() {
    const { timestamp } = this.state;

    if (timestamp === '') {
      return -1;
    }
    return timestamp;
  }

  async handleSubmit(event) {
    const { content } = this.state;
    const { videoId } = this.props;

    event.preventDefault();

    try {
      const user = await Auth.currentAuthenticatedUser();

      await API.post('videocloud', '/comments', {
        body: {
          content,
          video: videoId,
          timestamp: this.defaultTimestamp(),
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
    const { content, timestamp } = this.state;
    const videoDuration = 60; // TODO, fetch video length from S3 video url

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
              <Form.Group controlId="timestamp">
                <Form.Control
                  type="number"
                  min={0}
                  max={videoDuration}
                  onChange={this.handleChange}
                  value={timestamp}
                  placeholder="Select timestamp..."
                />
              </Form.Group>
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

export default CommentUpload;
