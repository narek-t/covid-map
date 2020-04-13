import React from 'react';
import GlobalFilter from './GlobalFilter';
import './Filter.scss';

interface Props {
  globalDisplayMode: boolean;
  visibleWorldStat: boolean;
  setVisibleWorldStat: (checked: boolean) => void;
  globalData: TransformedData[] | null;
  exportSelectedCountries: (data: TransformedData[] | []) => void;
}

const Filter = (props: Props) => {
  const {
    globalDisplayMode,
    visibleWorldStat,
    setVisibleWorldStat,
    globalData,
    exportSelectedCountries,
  } = props;

  return globalDisplayMode ? (
    <GlobalFilter
      visibleWorldStat={visibleWorldStat}
      setVisibleWorldStat={setVisibleWorldStat}
      globalData={globalData}
      exportSelectedCountries={exportSelectedCountries}
    />
  ) : <div>asd</div>;
};

export default Filter;
