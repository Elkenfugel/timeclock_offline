import React, { Component } from 'react';
import getStyle from './style';
import BoxInputFrame from '../BoxInputFrame';
import { processCurrencyInputValue, processCurrencyMultiplierInputValue, getCurrencySymbol } from '../../utilities';

function CurrencyInput({
  name,
  sectionName,
  value,
  label,
  sublabel,
  placeholder,
  hasProblem,
  helpText,
  handleChange,
  isActive,
  formId,
  inputRef,
  isInline,
  currency,
  showCurrencyCode,
  isMultiplier,
  wageToMultiply
}) {

  const inputId = `${sectionName ? sectionName + '-' : ''}${name}-input-${formId}`;

  const style = getStyle();

  const processedValue = (
    isMultiplier ?
    processCurrencyInputValue(value, currency) :
    processCurrencyMultiplierInputValue(value, wageToMultiply)
  );

  const currencySymbol = isMultiplier ? getCurrencySymbol(currency) : undefined;

  return (
    <BoxInputFrame
      {...{
        label,
        inputId,
        sublabel,
        isInline
      }}
      hasIcon={currencySymbol ? 'left' : false}
    >
      <input
        id={inputId}
        className={hasProblem ? 'input is-danger' : 'input'}
        type="number"
        style={style.input}
        onChange={handleChange}
        disabled={!isActive}
        ref={inputRef}
        {...{
          name,
          placeholder,
          value
        }}
      />
      {currencySymbol &&
        <span className="icon is-left">
          {currencySymbol}
        </span>
      }
      {
        (processedValue.display === 'negative' && (
          <div style={style.amountDisplayNegative}>
            Negative values are not allowed
          </div>
        )) || (processedValue.display !== null && (
          <div style={style.amountDisplay}>
            {processedValue.display}
            {showCurrencyCode && currency !== 'X' && ` ${currency}`}
          </div>
        ))
      }
      {helpText &&
        <p className="help">{helpText}</p>
      }
    </BoxInputFrame>
  );
}

export default CurrencyInput;