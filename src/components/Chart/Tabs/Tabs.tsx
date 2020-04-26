import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import './Tabs.scss';

interface Props {
  activeTab: string;
  onChange: (mode: ViewMode) => void;
  data?: TransformedData;
}

const Tabs = (props: Props) => {
  const { data, onChange, activeTab } = props;
  const keys = _.filter(_.keys(data?.timeSeries[0]), k => k !== 'date');


  return (
    <div className="tabs">
      {_.map(keys, key => (
        <button
          className={classnames(
            'tabs-button',
            { active: key === activeTab },
          )}
          key={key}
          onClick={() => onChange(key as ViewMode)}
        >
          {_.capitalize(key)}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
