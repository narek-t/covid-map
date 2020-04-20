import Chart, { ChartScales, ChartTooltipOptions } from 'chart.js';
import _ from 'lodash';
import 'chartjs-plugin-colorschemes';
import { numberWithCommas } from 'utils';

// Chart global options
// @ts-ignore
Chart.defaults.global.elements.point.radius = 2;
// @ts-ignore
Chart.defaults.global.elements.line.borderWidth = 2;
// @ts-ignore
Chart.defaults.global.elements.line.fill = false;

const CHART_TYPE = 'line';

const PLUGINS = {
  colorschemes: {
    scheme: 'tableau.Tableau10',
  },
};

const SCALES: ChartScales = {
  yAxes: [{
    ticks: {
      beginAtZero: true,
    },
  }],
  xAxes: [{
    type: 'time',
    distribution: 'series',
    time: {
      parser: 'MM/DD/YYYY',
      tooltipFormat: 'll',
      unit: 'day',
      unitStepSize: 1,
      displayFormats: {
        day: 'MMM DD',
      },
    },
  }],
};

const TOOLTIP: ChartTooltipOptions = {
  mode: 'index',
  intersect: false,
  bodySpacing: 10,
  bodyFontSize: 13,
  itemSort: (a, b) => Number(b.value) - Number(a.value),
  callbacks: {
    label: (tooltipItem, data) => {
      const name = data.datasets && data.datasets[tooltipItem.datasetIndex || 0].label;
      return `${name}: ${numberWithCommas(Number(tooltipItem.value))}`;
    },
  },
};

interface Config {
  containerNode: HTMLCanvasElement;
}

class ChartBuilder {
  private chart: Chart;

  constructor(config: Config) {
    const { containerNode } = config;
    this.chart = new Chart(containerNode, {
      type: CHART_TYPE,
      options: {
        tooltips: TOOLTIP,
        scales: SCALES,
        plugins: PLUGINS,
      },
    });
  }

  update = (data: TransformedData[] | []) => {
    this.chart.data = {
      datasets: _.map(data, item => ({
        label: item.name,
        data: _.map(item.timeSeries, time => time.confirmed),
      })),
      labels: _.map(data[0] && data[0].timeSeries, time => time.date),
    };

    this.chart.update();
  };
}

export default ChartBuilder;
