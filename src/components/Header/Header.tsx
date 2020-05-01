import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import classnames from 'classnames';
import { DataContext, IDataProvider } from 'providers/data/data-provider';
import Switch from 'components/UI/Switch';
import DisplayModeButtons from './DisplayModeButtons';

import './Header.scss';

const Header = () => {
  const { actions, state }: IDataProvider = useContext(DataContext);
  const [menuActive, setMenuActive] = useState(false);
  const [installButtonVisible, setInstallButtonVisible] = useState(false);
  const promptRef = useRef(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      promptRef.current = e;
      setInstallButtonVisible(true);
    });
  }, []);


  const onInstall = (e: React.MouseEvent) => {
    e.preventDefault();
    setInstallButtonVisible(false);
    (promptRef.current as any).prompt();
  };

  const { mapMode, globalDisplayMode } = state;
  const { switchDisplayMode, switchMapMode } = actions;

  return (
    <header className="header">
      <div className="header-mobile__title">COVID-19</div>
      <button
        className={classnames(
          'header-mobile__install tabs-button active',
          { visible: installButtonVisible },
        )}
        onClick={e => onInstall(e)}
      >
        Install
      </button>
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
