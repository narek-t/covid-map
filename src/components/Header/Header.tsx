import React, { useContext } from 'react';
import { DataContext, IDataProvider } from 'providers/data/data-provider';
import classnames from 'classnames';
import './Header.scss';

const Header = () => {
  const { actions, state }: IDataProvider = useContext(DataContext);

  const { mapMode, globalDisplayMode } = state;
  const { switchDisplayMode } = actions;

  return (
    <header className="header">
      <div className="header__logo">
        COVID-19
      </div>
      <div className="header__menu">
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
          onClick={() => switchDisplayMode('usa')}
        >
          <span>US Stats</span>
        </button>
      </div>
      <div className="header__mode">
        <button
          className={classnames(
            { selected: mapMode },
          )}
        >
          Map
        </button>
        <button
          className={classnames(
            { selected: !mapMode },
          )}
        >
          TimeSeries
        </button>
      </div>
    </header>
  );
};

export default Header;
