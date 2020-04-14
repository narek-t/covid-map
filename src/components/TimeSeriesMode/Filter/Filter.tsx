import React from 'react';
import GlobalFilter from './GlobalFilter';
import './Filter.scss';

interface Props {
  globalDisplayMode: boolean;
  globalData: TransformedData[] | null;
  exportSelectedCountries: (data: TransformedData[] | []) => void;
}

const Filter = (props: Props) => {
  const {
    globalDisplayMode,
    globalData,
    exportSelectedCountries,
  } = props;

  return globalDisplayMode ? (
    <GlobalFilter
      globalData={globalData}
      exportSelectedCountries={exportSelectedCountries}
    />
  ) : <div>asd</div>;
};

export default Filter;
