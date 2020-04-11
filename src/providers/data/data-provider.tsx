import React, { createContext } from 'react';
import { getGlobalData, getUSData } from 'services/dataService';
import { getFlagFromStorage, setFlagToStorage } from 'utils/localStorage';
import { transformGlobalData } from 'utils/util';

export const DataContext = createContext<ProviderInterface>(null);
const GLOBAL_MODE = 'global';
const MAP_MODE = 'map';

interface State {
  mapMode: boolean;
  globalDisplayMode: boolean;
  globalData: TransformedData[] | null;
  usData: TransformedData[] | null;
  isLoading: boolean;
  dataError: Error | null;
}

interface Actions {
  switchMapMode: () => void;
  switchDisplayMode: (mode: string) => void;
}

interface Props {
  children: React.ReactChild;
}

class DataProvider extends React.PureComponent<Props, State> {
  state: State = {
    mapMode: getFlagFromStorage(MAP_MODE),
    globalDisplayMode: getFlagFromStorage(GLOBAL_MODE),
    globalData: null,
    usData: null,
    isLoading: true,
    dataError: null,
  };

  async componentDidMount() {
    try {
      const [rawGlobalData, rawUsData] = await Promise.all([getGlobalData(), getUSData()]);
      const globalData = transformGlobalData(rawGlobalData.data, 'name');
      const usData = transformGlobalData(rawUsData.data, 'name');
      this.setState({ globalData, usData, isLoading: false });
    } catch (error) {
      this.setState({ dataError: error, isLoading: false });
    }
  }

  switchMapMode = (timeSeriesMode: boolean) => {
    this.setState({ mapMode: !timeSeriesMode });
    setFlagToStorage(MAP_MODE, !timeSeriesMode);
  };

  switchDisplayMode = (mode: string) => {
    this.setState({ globalDisplayMode: mode === GLOBAL_MODE });
    setFlagToStorage(GLOBAL_MODE, mode === GLOBAL_MODE);
  };

  render() {
    const { children } = this.props;
    return (
      <DataContext.Provider
        value={{
          state: this.state,
          actions: {
            switchMapMode: this.switchMapMode,
            switchDisplayMode: this.switchDisplayMode,
          },
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

export interface IDataProvider {
  state: State;
  actions: Actions;
}

export default DataProvider;
