import React from 'react';
import classnames from 'classnames';
import './DisplayModeButtons.scss';

interface Props {
  globalDisplayMode: boolean;
  switchDisplayMode: (mode: string) => void;
}

const DisplayModeButtons = (props: Props) => {
  const { globalDisplayMode, switchDisplayMode } = props;
  return (
    <>
      <button
        className={classnames(
          { selected: globalDisplayMode },
        )}
        onClick={() => switchDisplayMode('global')}
      >
        <span>Global Stats</span>
      </button>
      <button
        className={classnames(
          { selected: !globalDisplayMode },
        )}
        onClick={() => switchDisplayMode('')}
      >
        <span>US Stats</span>
      </button>
    </>
  );
};

export default DisplayModeButtons;
