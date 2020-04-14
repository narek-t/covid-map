import React, { useState } from 'react';
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
  const [visibleCountryStats, setVisibleCountryStats] = useState(false);
  const [visibleWorldStat, setVisibleWorldStat] = useState(false);
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
    const updatedSelectedCountries = [...selectedCountries, country];
    const filteredData = _.differenceBy(globalData, updatedSelectedCountries, 'name');

    setFilterCountries(filteredData);
    setSelectedCountry(updatedSelectedCountries);
    exportSelectedCountries(updatedSelectedCountries);
  };

  const removeSelectedCountry = (country: TransformedData) => {
    const updatedSelectedCountries = _.without(selectedCountries, country);
    setSelectedCountry(updatedSelectedCountries);
    exportSelectedCountries(updatedSelectedCountries);
    if (country.name === 'World') {
      setVisibleWorldStat(false);
    }
  };

  const handleSetVisibleWorldStat = (checked: boolean) => {
    const groupedData = _.groupBy(_.flatMap(globalData, global => global.timeSeries), 'date');
    const worldStat: TransformedData = {
      name: 'World',
      lat: '',
      lng: '',
      timeSeries: _.map(groupedData, (data, i) => ({
        date: i,
        confirmed: _.sumBy(data, 'confirmed'),
        deaths: _.sumBy(data, 'deaths'),
        recovered: _.sumBy(data, 'recovered'),
      })),
    };

    if (checked) {
      setVisibleWorldStat(true);
      updateSelectedCountries(worldStat);
      return;
    }

    setVisibleWorldStat(false);
    removeSelectedCountry(worldStat);
  };

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
          onChange={checked => setVisibleCountryStats(checked)}
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
