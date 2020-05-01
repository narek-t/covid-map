import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import _ from 'lodash';
import DropdownList from 'components/UI/DropdownList';
import SelectedSubjects from 'components/UI/SelectedSubjects';
import CheckBoxes from './CheckBoxes';
import './Filter.scss';

interface Props {
  globalDisplayMode: boolean;
  globalData: TransformedData[] | null;
  usData: TransformedData[] | null;
  exportSelectedSubjects: (data: TransformedData[] | []) => void;
}

const getUSStates = (groupedByState: _.Dictionary<TransformedData[]>) => _.map(
  groupedByState, (d, name) => {
    const timeSeries = _.groupBy(_.flatMap(d, data => data.timeSeries), 'date');
    return {
      name: `${name} (State)`,
      lat: '',
      lng: '',
      timeSeries: _.map(timeSeries, (data, i) => ({
        date: i,
        confirmed: _.sumBy(data, 'confirmed'),
        deaths: _.sumBy(data, 'deaths'),
      })),
    };
  },
);

const getGroupedStat = (d: _.Dictionary<TimeSeries[]>, globalDisplayMode: boolean) => ({
  name: globalDisplayMode ? 'World' : 'US',
  lat: '',
  lng: '',
  timeSeries: _.map(d, (data, i) => ({
    date: i,
    confirmed: _.sumBy(data, 'confirmed'),
    deaths: _.sumBy(data, 'deaths'),
    ...(globalDisplayMode && { recovered: _.sumBy(data, 'recovered') }),
  })),
});

const Filter = (props: Props) => {
  const {
    globalData,
    exportSelectedSubjects,
    usData,
    globalDisplayMode,
  } = props;

  const groupedByState = useMemo(() => _.groupBy(usData, 'state'), [usData]);
  const usStates = getUSStates(groupedByState);

  const checkedUSData = usData && usData.length ? usData : [];

  const usStats = [...checkedUSData, ...usStates];

  const currentData = globalDisplayMode ? globalData : usStats;

  const groupedData = useMemo(() => _.groupBy(
    _.flatMap(_.filter(currentData, d => !d.name.includes('(State)')), data => data.timeSeries), 'date',
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [globalDisplayMode]);

  const groupedStat = useMemo(
    () => getGroupedStat(groupedData, globalDisplayMode),
    [groupedData, globalDisplayMode],
  );

  const [visibleCountryStats, setVisibleCountryStats] = useState(false);
  const [visibleWorldStat, setVisibleWorldStat] = useState(true);
  const [filteredCountries, setFilterCountries] = useState<TransformedData[]>(currentData || []);
  const [inputValue, setInputValue] = useState('');
  const [selectedCountries, setSelectedCountry] = useState<TransformedData[]>([]);

  useEffect(() => {
    setFilterCountries(currentData || []);
    setInputValue('');
    setSelectedCountry([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalDisplayMode]);

  const onInputChange = (value: string) => {
    setInputValue(value);

    const filteredData = _.differenceBy(_.filter(
      currentData,
      country => _.startsWith(country.name.toLowerCase(), value.toLowerCase()),
    ), selectedCountries, 'name');

    setFilterCountries(filteredData);
  };

  const updateSelectedCountries = (country: TransformedData) => {
    setInputValue('');
    const updatedSelectedCountries = _.unionBy(selectedCountries, [country], 'name');
    const filteredData = _.differenceBy(currentData, updatedSelectedCountries, 'name');

    setFilterCountries(filteredData);
    setSelectedCountry(updatedSelectedCountries);
  };

  const removeSelectedCountry = (country: TransformedData) => {
    const updatedSelectedCountries = _.reject(selectedCountries, country);
    setSelectedCountry(updatedSelectedCountries);
  };

  const handleSetVisibleWorldStat = (checked: boolean) => setVisibleWorldStat(checked);
  const handleSetVisibleCountryStats = (checked: boolean) => setVisibleCountryStats(checked);

  const stableExport = useCallback(exportSelectedSubjects, []);
  useEffect(() => {
    stableExport([groupedStat]);
  }, [groupedStat, stableExport]);

  useEffect(() => {
    if (visibleWorldStat && visibleCountryStats) {
      return stableExport([groupedStat, ...selectedCountries]);
    }
    if (visibleWorldStat && !visibleCountryStats) {
      return stableExport([groupedStat]);
    }
    if (!visibleWorldStat && !visibleCountryStats) {
      return stableExport([]);
    }
    return stableExport(selectedCountries);
  }, [selectedCountries, visibleWorldStat, visibleCountryStats, groupedStat, stableExport]);


  return (
    <div className="timeseries__header">
      <CheckBoxes
        globalDisplayMode={globalDisplayMode}
        handleSetVisibleWorldStat={handleSetVisibleWorldStat}
        handleSetVisibleCountryStats={handleSetVisibleCountryStats}
        visibleWorldStat={visibleWorldStat}
        visibleCountryStats={visibleCountryStats}
      />
      {visibleCountryStats && (
        <>
          <DropdownList
            data={filteredCountries}
            onSelect={country => updateSelectedCountries(country)}
            notFoundText="Subject not found."
            displayNotFound={
              !filteredCountries.length
            }
            onChange={value => onInputChange(value)}
            placeholder="Find Subject"
            inputValue={inputValue}
          />
          <SelectedSubjects
            data={selectedCountries}
            removeHandler={country => removeSelectedCountry(country)}
          />
        </>
      )}
    </div>
  );
};

export default Filter;
