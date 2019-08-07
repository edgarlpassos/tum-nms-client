import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { API, Auth } from 'aws-amplify';
import { Container } from 'react-bootstrap';
import { getFile, listFiles } from '../lib/awsLib';
import CommentFeed from '../components/CommentFeed';
import VideoPlayer from '../components/VideoPlayer';
import Loader from '../components/Loader';
import './VideoItem.css';

const propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

class VideoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: null,
      urls: {},
      userId: null,
      maxRes: null,
      videoProgress: null,
      comments: null,
    };

    this.videoPlayer = null;

    this.handleVideoProgressChange = this.handleVideoProgressChange.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.ref = (videoPlayer) => { this.videoPlayer = videoPlayer; };
  }

  async componentDidMount() {
    try {
      const { match } = this.props;
      const video = await API.get('videocloud', `/videos/${match.params.id}`);
      let files = await listFiles('outputs/');
      files = files.filter(({ key }) => (key.split('/')[1].split('_')[1] === video.location)).map(({ key }) => key);
      const urls = await this.getVideoUrls(files);
      const maxRes = Math.max(...Object.keys(urls));

      let userId;
      try {
        const user = await Auth.currentAuthenticatedUser();
        userId = parseInt(user.attributes['custom:id'], 10);
      } catch (error) {
        // do nothing - users can see the videos without being authed
      }

      const comments = await API.get('videocloud', `/comments/${video.id}/${userId || 0}`);

      this.setState({
        video,
        urls,
        userId,
        maxRes,
        comments,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getVideoUrls(files) {
    const promises = files.map(async (key) => {
      const url = await getFile(key);
      return { res: key.split('_')[0].split('/')[1], url };
    });

    const array = await Promise.all(promises);

    return array.reduce((result, value) => {
      result[value.res] = value.url;
      return result;
    }, {});
  }

  handleSeek(videoProgress) {
    if (!this.videoPlayer) return;
    window.scrollTo(0, this.videoPlayer.offsetTop);
    this.videoPlayer.setProgress(videoProgress);
  }

  handleVideoProgressChange(videoProgress) {
    this.setState({ videoProgress });
  }

  renderAux() {
    const {
      video,
      urls,
      userId,
      maxRes,
      videoProgress,
      comments,
    } = this.state;

    if (comments === null) {
      return <Loader />;
    }

    return (
      <div>
        <VideoPlayer
          comments={comments}
          ref={this.ref}
          urls={urls}
          videoName={video.location}
          handleVideoProgressChange={this.handleVideoProgressChange}
          startResolution={maxRes}
        />
        <h1>{video.name}</h1>
        <span>
          <Link to={`/profile/${video.owner}`} className="active bold">
            {video.User.username}
          </Link>
          <p className="grey">{`Published on: ${new Date(video.createdAt).toDateString()}`}</p>
        </span>
        <hr className="mt-0 mb-4" />
        <CommentFeed
          comments={comments}
          videoId={video.id}
          userId={userId}
          handleSeek={this.handleSeek}
          videoProgress={videoProgress}
        />
      </div>
    );
  }

  render() {
    return (
      <Container className="VideoItem">
        {this.renderAux()}
      </Container>
    );
  }
}

VideoItem.propTypes = propTypes;

export default VideoItem;
