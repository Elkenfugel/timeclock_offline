import React from 'react';
import getStyle from './style';

function TagGroup({
  children,
  align,
  isInline
}) {

  let hasAlign, alignmentClass;
  if (align === 'center') {
    hasAlign = true;
    alignmentClass = 'has-text-centered';
  }
  else alignmentClass = '';

  const style = getStyle(hasAlign, isInline);

  return (
    <div
      className={`tags has-addons ${alignmentClass}`}
      {...{ style }}
    >
      {children}
    </div>
  );
}

export default TagGroup;