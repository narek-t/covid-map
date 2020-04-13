import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { DataContext, IDataProvider } from 'providers/data/data-provider';
import Filter from './Filter';
import './TimeSeriesMode.scss';

const TimeSeriesMode = () => {
  const { state }: IDataProvider = useContext(DataContext);
  const {
    globalDisplayMode,
    globalData,
    usData,
  } = state;

  const [visibleWorldStat, setVisibleWorldStat] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState<TransformedData[]>([]);


  return (
    <div
      className={classnames(
        'timeseries',
      )}
    >
      <Filter
        globalDisplayMode={globalDisplayMode}
        setVisibleWorldStat={checked => setVisibleWorldStat(checked)}
        visibleWorldStat={visibleWorldStat}
        globalData={globalData}
        exportSelectedCountries={setSelectedCountries}
      />
    </div>
  );
};

export default TimeSeriesMode;
