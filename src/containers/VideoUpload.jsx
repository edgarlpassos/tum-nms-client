import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button, Form } from 'react-bootstrap';
import { API, Auth } from 'aws-amplify';
import './VideoUpload.css';
import { uploadFile } from '../lib/awsLib';

const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

class VideoUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      videoName: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formIsInvalid = this.formIsInvalid.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleFile(event) {
    const file = event.target.files[0];
    this.setState({ file });
  }

  async handleSubmit(event) {
    const { history } = this.props;
    const { file, videoName } = this.state;

    event.preventDefault();

    try {
      const user = await Auth.currentAuthenticatedUser();
      const location = await uploadFile(file);

      await API.post('videocloud', '/videos', {
        body: {
          name: videoName,
          location: location.split('/')[0],
          owner: user.attributes['custom:id'],
        },
      });

      history.push('/');
    } catch (error) {
      alert(error);
    }
  }

  formIsInvalid() {
    const { videoName, file } = this.state;
    return videoName.length <= 0 || file === null || this.fileIsInvalid();
  }

  fileIsInvalid() {
    const { file } = this.state;

    return file.type !== 'video/mp4';
  }

  render() {
    const { videoName } = this.state;

    return (
      <div className="VideoUpload">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="videoName">
            <Form.Label>Video Name: </Form.Label>
            <Form.Control
              onChange={this.handleChange}
              value={videoName}
            />
          </Form.Group>
          <Form.Group controlId="videoContent">
            <Form.Label>Choose file:</Form.Label>
            <Form.Control
              onChange={this.handleFile}
              type="file"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={this.formIsInvalid()}
            type="submit"
          >
              Upload Video
          </Button>
        </Form>
      </div>
    );
  }
}

VideoUpload.propTypes = propTypes;

export default VideoUpload;
