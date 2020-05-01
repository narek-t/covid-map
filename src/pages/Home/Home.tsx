import React, { useContext } from 'react';
import { DataContext, IDataProvider } from 'providers/data/data-provider';
import Loader from 'components/UI/Loader';
import MapMode from 'components/MapMode';
import TimeSeriesMode from 'components/TimeSeriesMode';
// @ts-ignore
import PWAPrompt from 'react-ios-pwa-prompt';
import './Home.scss';

const HomePage = () => {
  const { state }: IDataProvider = useContext(DataContext);
  const {
    isLoading,
    mapMode,
  } = state;

  if (isLoading) return <Loader />;

  return (
    <>
      <PWAPrompt timesToShow={2} delay={2000} />
      {mapMode ? <MapMode /> : <TimeSeriesMode />}
    </>
  );
};

export default HomePage;
