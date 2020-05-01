import React from 'react';
import _ from 'lodash';
import ChartBuilder from 'native/ChartBuilder';
import Details from 'components/Details';
import Tabs from './Tabs';

import './Chart.scss';

const DEFAULT_VIEW_MODE: ViewMode = 'confirmed';

interface Props {
  data: TransformedData[] | [];
  globalDisplayMode: boolean;
}

interface State {
  viewMode: ViewMode;
  showModal: boolean;
  modalData: TransformedData | null;
}

class Chart extends React.PureComponent<Props, State> {
  // @ts-ignore
  Chart: ChartBuilder;

  containerNode: React.RefObject<HTMLCanvasElement> = React.createRef();

  state = {
    viewMode: DEFAULT_VIEW_MODE,
    showModal: false,
    modalData: null,
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
    const { data } = this.props;
    const modalData = _.find(data, subject => subject.name === name) || null;
    this.setState({ showModal: true, modalData });
  };

  closeDetails = () => this.setState({ showModal: false, modalData: null });

  changeActiveTab = (viewMode: ViewMode) => this.setState({ viewMode });

  render() {
    const { data } = this.props;
    const { viewMode, showModal, modalData } = this.state;
    if (!data) return null;

    return (
      <>
        {showModal && <Details data={modalData} onClose={this.closeDetails} />}
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
