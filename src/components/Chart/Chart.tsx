import React from 'react';
import ChartBuilder from 'native/ChartBuilder';
import Tabs from './Tabs';
import './Chart.scss';

const DEFAULT_VIEW_MODE: ViewMode = 'confirmed';

interface Props {
  data: TransformedData[] | [];
}

interface State {
  viewMode: ViewMode;
}

class Chart extends React.PureComponent<Props, State> {
  // @ts-ignore
  Chart: ChartBuilder;

  containerNode: React.RefObject<HTMLCanvasElement> = React.createRef();

  state = {
    viewMode: DEFAULT_VIEW_MODE,
  };

  componentDidMount() {
    const containerNode = this.containerNode.current;
    const { openDetails } = this;
    const { viewMode } = this.state;
    if (containerNode) {
      this.Chart = new ChartBuilder({
        containerNode,
        openDetails,
        viewMode,
      });
    }
  }

  componentDidUpdate() {
    const { data } = this.props;
    const { viewMode } = this.state;
    if (this.Chart) this.Chart.update(data, viewMode);
  }

  openDetails = (name: string) => {
    console.warn(name);
  };

  changeActiveTab = (viewMode: ViewMode) => this.setState({ viewMode });

  render() {
    const { data } = this.props;
    const { viewMode } = this.state;
    if (!data) return null;

    return (
      <>
        <canvas
          className="chart"
          ref={this.containerNode}
        />
        <Tabs
          data={data[0]}
          activeTab={viewMode}
          onChange={this.changeActiveTab}
        />
      </>
    );
  }
}

export default Chart;
