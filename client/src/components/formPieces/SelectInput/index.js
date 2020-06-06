import React from 'react';
import BoxInputFrame from '../BoxInputFrame';

function selectInput({
  propName,
  sectionName,
  value,
  options,
  changeHandlerFactory,
  label,
  sublabel,
  helpText,
  placeholder,
  iconClass,
  hasProblem,
  isActive,
  formId,
  inputRef,
  isInline,
  fieldToLabelRatio,
  fieldStyle
}) {

  const inputId = `${sectionName ? sectionName + '-' : ''}${propName}-input-${formId}`;

  return (
    <BoxInputFrame
      {...{
        label,
        inputId,
        sublabel,
        isInline,
        fieldToLabelRatio
      }}
      hasIcon={iconClass ? 'left' : false}
      styles={{ field: fieldStyle }}
    >
      <div className={`select is-fullwidth${hasProblem ? ' is-danger' : ''}`}>
        <select
          id={inputId}
          ref={inputRef}
          value={value}
          onChange={changeHandlerFactory(propName, true)}
          disabled={!isActive}
        >
          {
            placeholder && (
              <option disabled value="">
                {placeholder}
              </option>
            )
          }
          {
            options.map(option => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.isDisabled}
              >
                {option.name}
              </option>
            ))
          }
        </select>
      </div>
      {iconClass &&
        <span className="icon is-small is-left">
          <i className={iconClass}></i>
        </span>
      }
      {helpText &&
        <p className="help">{helpText}</p>
      }
    </BoxInputFrame>
  );
}

export default selectInput;