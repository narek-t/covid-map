import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import Input from 'components/UI/Input';
import Select from 'components/UI/Select';
import {
  getTotalCases,
  transformUSData,
  getCasesForState,
  numberWithCommas,
  extractCases,
} from 'utils';
import './USDataList.scss';

const DEFAULT_SELECTED_STATE = 'New York';
const SEARCH_MINIMUM_LENGTH = 3;

interface Props {
  data: TransformedData[] | null;
  setSelectedSubject: (city: TransformedData) => void;
}

interface State {
  selectedCity: string;
  data: USDataList | null;
  selectedState: string;
  searchString: string;
  filteredData: TransformedData[] | null;
}

class DataList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCity: '',
      data: transformUSData(props.data),
      selectedState: DEFAULT_SELECTED_STATE,
      searchString: '',
      filteredData: null,
    };
  }

  selectCity = (city: TransformedData) => {
    const { setSelectedSubject } = this.props;
    this.setState({ selectedCity: city.name },
      () => setSelectedSubject(city));
  };

  selectState = (selectedState: string) => {
    this.setState({
      selectedState,
      searchString: '',
      filteredData: null,
    });
  };

  getCityInfo = (city: TransformedData) => {
    const [totalConfirmed, diff] = getTotalCases(city.timeSeries, 'confirmed');
    return (
      totalConfirmed > 0 ? (
        <div
          className={classnames(
            'country data-item',
            { selected: false },
          )}
          key={city.name}
          onClick={() => this.selectCity(city)}
        >
          <div className="country__title data-item__title">
            <span className="country__name data-item__name">{city.name}</span>
          </div>
          <div className="country__stats data-item__stats">
            <div className="data-item__stats-recovered">Population: {numberWithCommas(Number(city.population))}</div>
            <div className="data-item__stats-confirmed">Confirmed: {extractCases([totalConfirmed, diff])}</div>
            <div className="data-item__stats-deaths">Deaths: {extractCases(getTotalCases(city.timeSeries, 'deaths'))}</div>
          </div>
        </div>
      ) : null
    );
  };

  filterData = (value: string) => {
    this.setState({ searchString: value });

    const { data } = this.props;
    if (value.length >= SEARCH_MINIMUM_LENGTH) {
      const filteredData = data && data.filter(
        country => country.name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
      );
      this.setState({ filteredData });
    }
  };

  render() {
    const {
      data,
      selectedState,
      filteredData,
      searchString,
    } = this.state;

    if (!data) return null;
    const state = data[selectedState];
    const [totalConfirmed, totalDeaths, casesPerMillion] = getCasesForState(state);
    const fixedCasesPerMillion = casesPerMillion > 0 ? Number(casesPerMillion.toFixed(2)) : 0;
    const selectedData = searchString.length >= SEARCH_MINIMUM_LENGTH
      && filteredData ? filteredData : state;

    return (
      <>
        <div className="filter-input">
          <Input
            onChange={value => this.filterData(value)}
            placeholder="Find city"
            value={searchString}
          />
        </div>
        <div className="or">
          OR
          <br />
          Select a State
        </div>
        <Select
          className="select"
          value={selectedState}
          data={data}
          onChange={value => this.selectState(value)}
        />
        {searchString.length < SEARCH_MINIMUM_LENGTH ? (
          <div className="state-info">
            <div className="state-info__inner">
              <div className="state-info__title">{selectedState}</div>
              {Number.isFinite(fixedCasesPerMillion) && (
                <div className="state-info__per-million"><span>{numberWithCommas(fixedCasesPerMillion)}</span> cases per 1M people</div>
              )}
              <div className="state-info__confirmed"><span>{numberWithCommas(totalConfirmed)}</span> confirmed</div>
              <div className="state-info__deaths"><span>{numberWithCommas(totalDeaths)}</span> deaths</div>
            </div>
          </div>
        ) : null}
        {selectedData.length ? _.map(selectedData, city => this.getCityInfo(city)) : (
          <div className="no-data">
            <div className="no-data__title">
              City not found.
            </div>
            Possible reasons:
            <ul>
              <li>The name is wrong</li>
              <li>There are no infected people.</li>
              <li>No info for that city.</li>
            </ul>
          </div>
        )}
      </>
    );
  }
}

export default DataList;
