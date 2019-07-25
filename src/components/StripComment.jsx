import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const stripCommentPropTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  totalLength: PropTypes.number.isRequired,
};

const StripComment = (props) => {
  const { comment, totalLength } = props;
  const { timestamp } = comment;

  return (
    <OverlayTrigger
      trigger="hover"
      placement="bottom"
      overlay={(
        <Popover>
          <strong>{`${comment.username}: `}</strong>
          {comment.content}
        </Popover>
      )}
    >
      <FontAwesomeIcon
        style={{ position: 'relative', left: timestamp * 1024 / totalLength }}
        icon={faComment}
        size="xs"
        color="white"
      />
    </OverlayTrigger>
  );
};

StripComment.propTypes = stripCommentPropTypes;

export default StripComment;
