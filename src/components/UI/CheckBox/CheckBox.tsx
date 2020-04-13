import React from 'react';
import './CheckBox.scss';

interface Props {
  id: string;
  label?: string;
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const CheckBox = (props: Props) => {
  const {
    id,
    label,
    onChange,
    checked,
  } = props;
  return (
    <label htmlFor={id} className="checkbox">
      <input
        type="checkbox"
        id={id}
        className="checkbox-input"
        onChange={e => onChange(e.target.checked)}
        checked={checked}
      />
      <span className="checkbox-checkmark" />
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

export default CheckBox;
