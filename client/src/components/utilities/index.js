import modalTogglerFactoryFactory from './modalTogglerFactoryFactory';
export * from '../../utilities';
export * from './currency';
export * from './forms';
export { default as addReportModalActivity } from './addReportModalActivity';

function promiseToSetState(component, updatedState) {
  return new Promise(resolve => component.setState(updatedState, resolve));
}

function getColorClass(theme) {
  const words = theme.split(' ');
  let className = '';
  words.forEach((word, index) => {
    if (index !== 0) className += ' ';
    className += `is-${word}`;
  });
  return className;
}

function getSizeClass(size) {
  if ((!size && size !== 0) || size === 'none') return '';
  const isNum = typeof(size) === 'number' || parseInt(size).toString() === size;
  return isNum ? `is-size-${size}` : `is-${size}`;
}

function keyTriggerCheckerFactory(handleClick) {
  return function checkForKeyTrigger(event) {
    const keyCode = event.which;
    if (keyCode === 13 || keyCode === 32) {
      handleClick();
    }
  };
}

export {
  promiseToSetState,
  getColorClass,
  getSizeClass,
  keyTriggerCheckerFactory,
  modalTogglerFactoryFactory
};