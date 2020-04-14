import React from 'react';
import ChartBuilder from 'native/ChartBuilder';
import './Chart.scss';

interface Props {
  data: TransformedData[] | [];
}

interface State {

}

class Chart extends React.PureComponent<Props, State> {

  Map: ChartBuilder;

  containerNode: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    const containerNode = this.containerNode.current;
    if (containerNode) {
      const { data } = this.props;
      this.Chart = new ChartBuilder({
        containerNode,
        data,
      });
    }
  }

  render() {
    const { data } = this.props;
    if (!data) return null;

    return (
      <div
        className="chart"
        ref={this.containerNode}
      />
    );
  }
}

export default Chart;
