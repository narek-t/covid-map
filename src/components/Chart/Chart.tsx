import React from 'react';
import ChartBuilder from 'native/ChartBuilder';
import './Chart.scss';

interface Props {
  data: TransformedData[] | [];
}

interface State {

}

class Chart extends React.PureComponent<Props, State> {
  // @ts-ignore
  Chart: ChartBuilder;

  containerNode: React.RefObject<HTMLCanvasElement> = React.createRef();

  componentDidMount() {
    const containerNode = this.containerNode.current;
    if (containerNode) {
      this.Chart = new ChartBuilder({
        containerNode,
      });
    }
  }

  componentDidUpdate() {
    const { data } = this.props;
    if (this.Chart) this.Chart.update(data);
  }

  render() {
    const { data } = this.props;
    if (!data) return null;

    return (
      <canvas
        className="chart"
        ref={this.containerNode}
      />
    );
  }
}

export default Chart;
