import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { DataContext, IDataProvider } from 'providers/data/data-provider';
import Sidebar from 'components/Sidebar';
import Map from 'components/Map';
import Loader from 'components/UI/Loader';
import './Home.scss';

const HomePage = () => {
  const { state }: IDataProvider = useContext(DataContext);
  const {
    globalData,
    usData,
    globalDisplayMode,
    isLoading,
  } = state;
  const [sidebarOpened, toggleSidebar] = useState(true);
  const [selectedSubject, setSelectedSubject]: [
    TransformedData | null, any
  ] = useState(null);
  const toggleSidebarView = () => toggleSidebar(!sidebarOpened);
  const data = globalDisplayMode ? globalData : usData;

  if (isLoading) return <Loader />;

  return (
    <div
      className={classnames(
        'home',
        { sidebarOpened },
      )}
    >
      <Map
        sidebarOpened={sidebarOpened}
        data={data}
        globalDisplayMode={globalDisplayMode}
        selectedSubject={selectedSubject}
      />
      <Sidebar
        opened={sidebarOpened}
        toggleSidebar={toggleSidebarView}
        data={data}
        globalDisplayMode={globalDisplayMode}
        setSelectedSubject={subject => setSelectedSubject(subject)}
      />
    </div>
  );
};

export default HomePage;
