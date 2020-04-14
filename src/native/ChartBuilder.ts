import * as d3 from 'd3';

interface Config {
  data: TransformedData[] | [];
  containerNode: HTMLDivElement;
}

class MapBuilder {
  constructor(config: Config) {
    const { containerNode, data } = config;

  }

  update = (data: TransformedData[] | []) => {

  };
}

export default MapBuilder;
