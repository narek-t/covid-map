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

  const [selectedSubjects, setSelectedSubjects] = useState<TransformedData[]>([]);

  return (
    <div
      className={classnames(
        'timeseries',
      )}
    >
      <Filter
        globalDisplayMode={globalDisplayMode}
        globalData={globalData}
        usData={usData}
        exportSelectedSubjects={setSelectedSubjects}
      />
      <Chart
        data={selectedSubjects}
        globalDisplayMode={globalDisplayMode}
      />
    </div>
  );
};

export default TimeSeriesMode;
