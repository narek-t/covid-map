import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';
import './Select.scss';

interface Props {
  value: string;
  data: any;
  onChange: (value: string) => void;
  className?: string;
}

const Select = (props: Props) => {
  const {
    value,
    data,
    onChange,
    className,
  } = props;
  return (
    <div className="select-wrapper">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={classnames(
          'select',
          { className },
        )}
      >
        { _.map(data, (_data, i) => (
          <option value={i} key={i}>{i}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
