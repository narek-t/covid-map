import React from 'react';
import './Switch.scss';

interface Props {
  mapMode: boolean;
  switchMapMode: (timeSeriesMode: boolean) => void;
}

const Switch = (props: Props) => {
  const { mapMode, switchMapMode } = props;
  return (
    <>
      <span className="switch-label">Map</span>
      <label className="switch" htmlFor="switch">
        <input
          type="checkbox"
          id="switch"
          checked={!mapMode}
          onChange={e => switchMapMode(e.target.checked)}
        />
        <span className="slider round" />
      </label>
      <span className="switch-label">TimeSeries</span>
    </>
  );
};

export default Switch;
