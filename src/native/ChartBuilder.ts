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
};

const LEGEND = {
  onHover: (e: MouseEvent) => {
    (e.target as HTMLCanvasElement).style.cursor = 'pointer';
  },
  onLeave: (e: MouseEvent) => {
    (e.target as HTMLCanvasElement).style.cursor = 'default';
  },
};

interface Config {
  containerNode: HTMLCanvasElement;
  viewMode?: ViewMode;
  openDetails?: (name: string) => void;
  subjectName?: string;
}

class ChartBuilder {
  private chart: Chart;

  private viewMode?: ViewMode;

  constructor(config: Config) {
    const {
      containerNode,
      openDetails,
      viewMode,
      subjectName,
    } = config;
    this.viewMode = viewMode;
    this.chart = new Chart(containerNode, {
      type: CHART_TYPE,
      options: {
        tooltips: {
          ...TOOLTIP,
          callbacks: {
            title: tooltipItems => {
              const beforeTitle = viewMode ? _.capitalize(this.viewMode) : subjectName;
              return `${beforeTitle}: ${tooltipItems[0].xLabel}`;
            },
            label: (tooltipItem, data) => {
              const name = data.datasets && data.datasets[tooltipItem.datasetIndex || 0].label;
              return `${name}: ${numberWithCommas(Number(tooltipItem.value))}`;
            },
          },
        },
        scales: SCALES,
        plugins: PLUGINS,
        legend: {
          ...LEGEND,
          ...(openDetails) && {
            onClick: (_$, legend) => {
              openDetails(legend.text || '');
            },
          },
        },
        title: {
          text: viewMode ? 'Click on subject name for details.' : subjectName,
          display: true,
        },
      },
    });
  }

  update = (data: TransformedData[] | [], viewMode?: ViewMode) => {
    if (viewMode) {
      return this.updateGlobalChart(data, viewMode);
    }
    return this.updateRegularChart(data);
  };

  updateGlobalChart = (data: TransformedData[] | [], viewMode: ViewMode) => {
    this.viewMode = viewMode;
    this.chart.data = {
      datasets: _.map(data, item => ({
        label: item.name,
        data: _.map(item.timeSeries, time => time[viewMode]),
      })),
      labels: _.map(data[0] && data[0].timeSeries, time => time.date),
    };
    return this.chart.update();
  };

  getColors = (key: string) => {
    switch (key) {
      case 'confirmed':
        return '#f28e2b';
      case 'deaths':
        return '#e15758';
      default:
        return '#59a14f';
    }
  };

  getLineStyle = (key: string) => {
    const color = this.getColors(key);
    return {
      borderColor: color,
      pointBackgroundColor: color,
      pointBorderColor: color,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: color,
    };
  };

  updateRegularChart = (data: TransformedData[] | []) => {
    const [{ timeSeries }] = data;
    const keys = _.filter(_.keys(timeSeries[0]), k => k !== 'date') as ViewMode[];

    this.chart.data = {
      datasets: _.map(keys, key => ({
        label: _.capitalize(key),
        data: _.map(timeSeries, time => time[key]),
        ...this.getLineStyle(key),
      })),
      labels: _.map(timeSeries, time => time.date),
    };
    return this.chart.update();
  };
}

export default ChartBuilder;
