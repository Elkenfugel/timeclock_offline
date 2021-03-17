import React from 'react';
import Notification from '../../Notification';
import RestorableNotification from '../../RestorableNotification';
import ProgressBar from '../ProgressBar';

function FormMessages({
  showMessage,
  hasSuccess,
  hasProblem,
  hasWarning,
  successMessages,
  problemMessages,
  infoMessages,
  warningMessages,
  successRedirect,
  closeMessage,
  disabled,
  allowRestore
}) {

  let theme, messages, close;
  if (hasSuccess) {
    theme = 'success';
    messages = successMessages;
  }
  else if (hasProblem) {
    theme = 'danger';
    messages = problemMessages;
    close = closeMessage;
  }
  else if (hasWarning) {
    theme = 'warning';
    messages = warningMessages;
  }
  else {
    theme = 'info';
    messages = infoMessages;
    close = closeMessage;
  }
  if (disabled) close = undefined;

  const hasMessages = messages && messages.length > 0;
  const hasProgressBar = hasSuccess && successRedirect;
  const { secondsToDelayRedirect, secondsRemaining, messageFragment } = successRedirect || {};

  if (hasProgressBar && messageFragment) {
    messages.push(`${messageFragment} in ${Math.round(secondsRemaining)} seconds...`);
  }

  return (showMessage && (hasMessages || hasProgressBar)) ? (
    <Notification {...{ theme, messages, close }}>
      {hasSuccess && successRedirect && (
        <ProgressBar
          {...{ theme }}
          remaining={secondsRemaining}
          max={secondsToDelayRedirect}
        />
      )}
    </Notification>
  ) : (
    <></>
  );

  return (hasMessages || hasProgressBar) ? (
    <RestorableNotification {...{ theme, messages, close, allowRestore }}>
      {hasProgressBar && (
        <ProgressBar
          {...{ theme }}
          remaining={secondsRemaining}
          max={secondsToDelayRedirect}
        />
      )}
    </RestorableNotification>
  ) : (
    <></>
  );
}

export default FormMessages;