import React from 'react';
import GlobalDataList from './GlobalDataList';
import USDataList from './USDataList';
import './DataList.scss';

interface Props {
  data: TransformedData[] | null;
  globalDisplayMode: boolean;
  setSelectedSubject: (subject: TransformedData) => void;
}

const DataList = (props: Props) => {
  const {
    data,
    globalDisplayMode,
    setSelectedSubject,
  } = props;

  return globalDisplayMode ? (
    <GlobalDataList data={data} setSelectedSubject={country => setSelectedSubject(country)} />
  ) : <USDataList data={data} setSelectedSubject={country => setSelectedSubject(country)} />;
};

export default DataList;
