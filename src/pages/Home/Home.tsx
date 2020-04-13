import React, { useContext } from 'react';
import { DataContext, IDataProvider } from 'providers/data/data-provider';
import Loader from 'components/UI/Loader';
import MapMode from 'components/MapMode';
import TimeSeriesMode from 'components/TimeSeriesMode';
import './Home.scss';

const HomePage = () => {
  const { state }: IDataProvider = useContext(DataContext);
  const {
    isLoading,
    mapMode,
  } = state;

  if (isLoading) return <Loader />;

  return mapMode ? <MapMode /> : <TimeSeriesMode />;
};

export default HomePage;
