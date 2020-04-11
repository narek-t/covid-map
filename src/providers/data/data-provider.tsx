import React, { createContext } from 'react';
import { getGlobalData, getUSData } from 'services/dataService';

export const DataContext = createContext<ProviderInterface>(null);

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
    mapMode: true,
    globalDisplayMode: true,
    globalData: null,
    usData: null,
    isLoading: true,
    dataError: null,
  };

  async componentDidMount() {
    try {
      const [globalData, usData] = await Promise.all([getGlobalData(), getUSData()]);
      this.setState({ globalData, usData, isLoading: false });
    } catch (error) {
      this.setState({ dataError: error, isLoading: false });
    }
  }

  switchMapMode = () => {
    this.setState(prevState => ({
      mapMode: !prevState.mapMode,
    }));
  };

  switchDisplayMode = (mode: string) => this.setState({ globalDisplayMode: mode === 'global' });

  render() {
    const { children } = this.props;
    const { globalData, usData, isLoading } = this.state;
    if (!globalData || !usData || isLoading) return null;

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
