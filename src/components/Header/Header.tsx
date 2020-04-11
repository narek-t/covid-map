import React, { useContext } from 'react';
import { DataContext, IDataProvider } from 'providers/data/data-provider';
import Switch from 'components/UI/Switch';
import DisplayModeButtons from './DisplayModeButtons';

import './Header.scss';

const Header = () => {
  const { actions, state }: IDataProvider = useContext(DataContext);

  const { mapMode, globalDisplayMode } = state;
  const { switchDisplayMode, switchMapMode } = actions;

  return (
    <header className="header">
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
    </header>
  );
};

export default Header;
