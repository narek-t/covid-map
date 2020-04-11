import React from 'react';
import classnames from 'classnames';
import Input from 'components/UI/Input';
import { getTotalCases, extractCases } from 'utils';
import './GlobalDataList.scss';

interface Props {
  data: TransformedData[] | null;
  setSelectedSubject: (country: TransformedData) => void;
}

interface State {
  selectedCountryName: string;
  filteredData: TransformedData[] | null;
}

const SEARCH_MINIMUM_LENGTH = 2;

class GlobalDataList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCountryName: '',
      filteredData: props.data,
    };
  }

  selectCountry = (country: TransformedData) => {
    const { setSelectedSubject } = this.props;
    this.setState({ selectedCountryName: country.name },
      () => setSelectedSubject(country));
  };

  filterData = (value: string) => {
    const { data } = this.props;
    if (value.length >= SEARCH_MINIMUM_LENGTH) {
      const filteredData = data && data.filter(
        country => country.name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
      );
      this.setState({ filteredData });
    }
  };

  getCountryDetails = (country: TransformedData) => {
    const { selectedCountryName } = this.state;
    const [totalConfirmed, diff] = getTotalCases(country.timeSeries, 'confirmed');

    return (
      totalConfirmed > 0 ? (
        <div
          className={classnames(
            'country data-item',
            { selected: country.name === selectedCountryName },
          )}
          key={country.name}
          onClick={() => this.selectCountry(country)}
        >
          <div className="country__title data-item__title">
            <span className="country__flag">{country.flag}</span>
            <span className="country__name data-item__name">{country.name}</span>
            <span className="country__code">{country.code ? `(${country.code})` : null}</span>
          </div>
          <div className="country__stats data-item__stats">
            <div className="data-item__stats-confirmed">Confirmed: {extractCases([totalConfirmed, diff])}</div>
            <div className="data-item__stats-deaths">Deaths: {extractCases(getTotalCases(country.timeSeries, 'deaths'))}</div>
            <div className="data-item__stats-recovered">Recovered: {extractCases(getTotalCases(country.timeSeries, 'recovered'))}</div>
          </div>
        </div>
      ) : null
    );
  };

  render() {
    const { filteredData } = this.state;
    if (!filteredData) return null;
    return (
      <>
        <div className="filter-input">
          <Input
            onChange={value => this.filterData(value)}
            placeholder="Filter"
          />
        </div>
        {filteredData.length ? filteredData.map(country => this.getCountryDetails(country)) : (
          <div className="no-data">
            <div className="no-data__title">
              Country not found.
            </div>
            Possible reasons:
            <ul>
              <li>The name is wrong</li>
              <li>There are no infected people.</li>
              <li>No info for that country.</li>
            </ul>
          </div>
        )}
      </>
    );
  }
}

export default GlobalDataList;
