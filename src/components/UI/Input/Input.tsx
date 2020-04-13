import React from 'react';
import classnames from 'classnames';
import { ReactComponent as CloseIcon } from 'assets/close.svg';
import './Input.scss';

interface Props {
  type?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  value: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = React.forwardRef((props: Props, ref: any) => {
  const {
    type, placeholder, onChange, className, value, onBlur, onFocus,
  } = props;

  const clearInput = () => onChange('');

  return (
    <div className="input-wrapper">
      <input
        className={classnames(
          className,
          'input',
        )}
        type={type || 'text'}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || ''}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
      />
      {value && (
        <button className="input-clear" onClick={clearInput}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
});

export default Input;
