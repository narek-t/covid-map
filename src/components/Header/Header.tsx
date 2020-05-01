import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { DataContext, IDataProvider } from 'providers/data/data-provider';
import Switch from 'components/UI/Switch';
import DisplayModeButtons from './DisplayModeButtons';

import './Header.scss';

const Header = () => {
  const { actions, state }: IDataProvider = useContext(DataContext);
  const [menuActive, setMenuActive] = useState(false);

  const { mapMode, globalDisplayMode } = state;
  const { switchDisplayMode, switchMapMode } = actions;

  return (
    <header className="header">
      <div className="header-mobile__title">COVID-19</div>
      <div
        className={classnames(
          'header-mobile__button',
          { active: menuActive },
        )}
        onClick={() => setMenuActive(!menuActive)}
      >
        <span />
        <span />
        <span />
      </div>
      <div className="header__inner">
        <div className="header__logo">
          COVID-19
        </div>
        <div className="header__menu">
          <DisplayModeButtons
            globalDisplayMode={globalDisplayMode}
            switchDisplayMode={switchDisplayMode}
          />
        </div>
        <div className="header__mode">
          <Switch
            mapMode={mapMode}
            switchMapMode={switchMapMode}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
