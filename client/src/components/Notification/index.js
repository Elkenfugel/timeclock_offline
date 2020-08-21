import React from 'react';
import getStyle from './style';
import { getColorClass } from '../utilities';

function Notification({
  children,
  theme,
  close,
  messages
}) {

  const style = getStyle();

  let className = 'notification';
  if (theme) className += ` ${getColorClass(theme)}`;

  const _close = (event) => {
    event.preventDefault();
    close();
  }

  return (
    <div className={className} style={style.notification}>
      {close && (
        <button className="delete" onClick={_close} type="button"></button>
      )}
      {messages ? (
        messages.map(
          (msg, index, arr) => (
            <NotificationText key={msg} isLast={index === arr.length - 1}>
              {msg}
            </NotificationText>
          )
        )
      ) : (
        children
      )}
    </div>
  );
}

export default Notification;

function NotificationText({
  isLast,
  children
}) {

  const style = getStyle();
  
  return (
    <p style={isLast ? style.lastP : style.p}>
      {children}
    </p>
  );
}

export { NotificationText };