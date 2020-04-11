import React, { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { ReactComponent as CloseIcon } from 'assets/close.svg';
import './Input.scss';

interface Props {
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  value?: string;
}

const Input = (props: Props) => {
  const {
    type, placeholder, onChange, className, value,
  } = props;
  const [inputState, changeInputValue] = useState('');

  const onInputChange = useCallback(onChange, []);

  useEffect(() => {
    onInputChange(inputState);
  }, [inputState, onInputChange]);

  useEffect(() => {
    changeInputValue(value || '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInputValue(e.target.value);
  };

  const clearInput = () => changeInputValue('');

  return (
    <div className="input-wrapper">
      <input
        className={classnames(
          className,
          'input',
        )}
        type={type || 'text'}
        value={inputState}
        onChange={e => handleChange(e)}
        placeholder={placeholder || ''}
      />
      {inputState && (
        <button className="input-clear" onClick={clearInput}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default Input;
