import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import _ from 'lodash';
import CheckBox from 'components/UI/CheckBox';
import DropdownList from 'components/UI/DropdownList';
import SelectedSubjects from 'components/UI/SelectedSubjects';

interface Props {
  exportSelectedCountries: (data: TransformedData[] | []) => void;
  globalData: TransformedData[] | null;
}

const GlobalFilter = (props: Props) => {
  const {
    globalData,
    exportSelectedCountries,
  } = props;

  const groupedData = useMemo(() => _.groupBy(_.flatMap(globalData, global => global.timeSeries), 'date'), [globalData]);

  const getWorldStat = (d: _.Dictionary<TimeSeries[]>) => ({
    name: 'World',
    lat: '',
    lng: '',
    timeSeries: _.map(d, (data, i) => ({
      date: i,
      confirmed: _.sumBy(data, 'confirmed'),
      deaths: _.sumBy(data, 'deaths'),
      recovered: _.sumBy(data, 'recovered'),
    })),
  });

  const worldStat = useMemo(() => getWorldStat(groupedData), [groupedData]);

  const [visibleCountryStats, setVisibleCountryStats] = useState(false);
  const [visibleWorldStat, setVisibleWorldStat] = useState(true);
  const [filteredCountries, setFilterCountries] = useState<TransformedData[]>(globalData || []);
  const [inputValue, setInputValue] = useState('');
  const [selectedCountries, setSelectedCountry] = useState<TransformedData[]>([]);

  const onInputChange = (value: string) => {
    setInputValue(value);

    const filteredData = _.differenceBy(_.filter(
      globalData,
      country => _.startsWith(country.name.toLowerCase(), value.toLowerCase()),
    ), selectedCountries, 'name');

    setFilterCountries(filteredData);
  };

  const updateSelectedCountries = (country: TransformedData) => {
    setInputValue('');
    const updatedSelectedCountries = _.unionBy(selectedCountries, [country], 'name');
    const filteredData = _.differenceBy(globalData, updatedSelectedCountries, 'name');

    setFilterCountries(filteredData);
    setSelectedCountry(updatedSelectedCountries);
  };

  const removeSelectedCountry = (country: TransformedData) => {
    const updatedSelectedCountries = _.reject(selectedCountries, country);
    setSelectedCountry(updatedSelectedCountries);
  };

  const handleSetVisibleWorldStat = (checked: boolean) => setVisibleWorldStat(checked);
  const handleSetVisibleCountryStats = (checked: boolean) => setVisibleCountryStats(checked);

  const stableExport = useCallback(exportSelectedCountries, []);
  useEffect(() => {
    stableExport([worldStat]);
  }, [worldStat, stableExport]);

  useEffect(() => {
    if (visibleWorldStat && visibleCountryStats) {
      return stableExport([worldStat, ...selectedCountries]);
    }
    if (visibleWorldStat && !visibleCountryStats) {
      return stableExport([worldStat]);
    }
    if (!visibleWorldStat && !visibleCountryStats) {
      return stableExport([]);
    }
    return stableExport(selectedCountries);
  }, [selectedCountries, visibleWorldStat, visibleCountryStats, worldStat, stableExport]);


  return (
    <div className="timeseries__header">
      <div className="timeseries__header-checkboxes">
        <CheckBox
          id="world"
          label="World Stats"
          onChange={checked => handleSetVisibleWorldStat(checked)}
          checked={visibleWorldStat}
        />
        <CheckBox
          id="country"
          label="Stats by Country"
          onChange={checked => handleSetVisibleCountryStats(checked)}
          checked={visibleCountryStats}
        />
      </div>
      {visibleCountryStats && (
        <>
          <DropdownList
            data={filteredCountries}
            onSelect={country => updateSelectedCountries(country)}
            notFoundText="Country not found."
            displayNotFound={
              !filteredCountries.length
            }
            onChange={value => onInputChange(value)}
            placeholder="Find Country"
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

export default GlobalFilter;
