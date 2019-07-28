import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Card } from 'react-bootstrap';
import { getFile } from '../lib/awsLib';
import StripComment from './StripComment';

const propTypes = {
  handleSeek: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  totalLength: PropTypes.number.isRequired,
  videoName: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

const imageNameFromVideoName = videoName => `strips/${videoName.split('.')[0]}.png`;

const overlapsActiveComment = (comment, activeCommentMap) => {
  for (let i = -2; i < 5; i++) {
    if (activeCommentMap[Math.round(comment.timestamp) + i]) {
      return true;
    }
  }
  return false;
};

const overlapsPlacedIcon = (comment, totalLength, listedCommentMap) => {
  const padding = 14 * totalLength / 1024; // 14 = width of the icon  + padding
  for (let i = Math.round(comment.timestamp) - padding; i < Math.round(comment.timestamp) + padding; i++) {
    if (listedCommentMap[i]) {
      return true;
    }
  }

  return false;
};

class VideoStrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeComment: null,
      activeComments: [],
      listedComments: [],
      moving: false,
      showActiveComment: false,
      stripImageLink: '',
    };

    this.handle = null;

    this.handleHandleDrage = this.handleHandleDrag.bind(this);
    this.ref = (handle) => { this.handle = handle; };
  }

  async componentDidMount() {
    const { videoName } = this.props;

    const imageName = imageNameFromVideoName(videoName);
    const stripImageLink = await getFile(imageName);

    this.setState({ stripImageLink });
  }

  componentDidUpdate(prevProps) {
    const { progress, totalLength } = this.props;

    if (prevProps.progress !== progress) {
      this.updateActiveComments(progress);
    }

    if (prevProps.totalLength !== totalLength) {
      this.updateCommentLists();
    }
  }

  updateActiveComments() {
    const { progress } = this.props;
    const { activeComment, activeComments } = this.state;
    let condition;

    if (!activeComment) {
      condition = true;
    } else {
      condition = Math.abs(progress - activeComment.timestamp) >= 2;
    }

    if (condition) {
      for (let i = 0; i < activeComments.length; i++) {
        const comment = activeComments[i];

        if (Math.abs(comment.timestamp - progress) <= 0.1) {
          this.setState({ activeComment: comment, showActiveComment: true });
          break;
        }

        if (Math.abs(comment.timestamp - progress) <= 0.5) {
          this.setState({ showActiveComment: false });
          break;
        }
      }
    }
  }

  updateCommentLists() {
    const { comments, totalLength } = this.props;
    const activeCommentMap = {};
    const listedCommentMap = {};

    comments.sort((c1, c2) => new Date(c1.createdAt) > new Date(c2.createdAt));

    comments.forEach((comment) => {
      if (!overlapsActiveComment(comment, activeCommentMap)) {
        activeCommentMap[Math.round(comment.timestamp)] = comment;
        listedCommentMap[Math.round(comment.timestamp)] = comment;
      } else if (!overlapsPlacedIcon(comment, totalLength, listedCommentMap)) {
        listedCommentMap[Math.round(comment.timestamp)] = comment;
      }
    });

    const activeComments = [];
    _.forEach(activeCommentMap, (comment) => {
      activeComments.push(comment);
    });

    const listedComments = [];
    _.forEach(listedCommentMap, (comment) => {
      listedComments.push(comment);
    });

    this.setState({ activeComments, listedComments });
  }

  handleHandleDrag(event) {
    event.preventDefault();

    const { moving } = this.state;

    if (!this.handle || !moving) {
      return;
    }

    const { handleSeek, totalLength } = this.props;
    const originalX = this.handle.getBoundingClientRect().left;
    const drag = event.pageX - originalX;
    const deltaSeconds = drag * totalLength / 1024;

    handleSeek(deltaSeconds);
  }

  renderComment() {
    const { activeComment, showActiveComment } = this.state;

    if (!activeComment) {
      return null;
    }

    const { username, content } = activeComment;

    return (
      <Card className={`activeComment ${showActiveComment ? 'show' : ''}`}>
        <Card.Body>
          <Card.Title>{`${username} said:`}</Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  renderCommentIcons() {
    const { totalLength } = this.props;
    const { listedComments } = this.state;

    return (
      <div className="commentIcon">
        {
          listedComments.map(comment => (
            <StripComment key={comment.id} comment={comment} totalLength={totalLength} />
          ))
        }
      </div>
    );
  }

  render() {
    const { stripImageLink, moving } = this.state;
    const { progress, totalLength } = this.props;
    const playedWidth = 1024 * progress / totalLength;

    return (
      <div
        className={`VideoStrip ${moving ? 'grabbing' : ''}`}
        ref={this.ref}
      >
        <div
          className="StripController"
          onMouseDown={() => { this.setState({ moving: true }); }}
          onMouseUp={(event) => {
            this.setState({ moving: false });
            this.handleHandleDrag(event);
          }}
          onMouseMove={(event) => { this.handleHandleDrag(event); }}
        >
          <img src={stripImageLink} alt="Video Strip" />
          <div className="played" style={{ width: playedWidth }}>
            <img src={stripImageLink} alt="Video Strip Dark" />
          </div>
          <div className="handle" style={{ left: playedWidth }} />
            {this.renderCommentIcons()}
        </div>
        {this.renderComment()}
      </div>
    );
  }
}

VideoStrip.propTypes = propTypes;

export default VideoStrip;
