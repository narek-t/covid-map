import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { DataContext, IDataProvider } from 'providers/data/data-provider';
import Chart from 'components/Chart';
import Filter from './Filter';
import './TimeSeriesMode.scss';

const TimeSeriesMode = () => {
  const { state }: IDataProvider = useContext(DataContext);
  const {
    globalDisplayMode,
    globalData,
    usData,
  } = state;

  const [selectedCountries, setSelectedCountries] = useState<TransformedData[]>([]);

  const data = globalDisplayMode ? selectedCountries : [];

  return (
    <div
      className={classnames(
        'timeseries',
      )}
    >
      <Filter
        globalDisplayMode={globalDisplayMode}
        globalData={globalData}
        exportSelectedCountries={setSelectedCountries}
      />
      <Chart
        data={data}
      />
    </div>
  );
};

export default TimeSeriesMode;
