import _ from 'lodash';

export const transformGlobalData = (
  data: any, name: string,
): TransformedData[] => Object.keys(data).map(
  key => ({ [name]: key, ...data[key] }),
);

export const transformUSData = (data: TransformedData[] | null): USDataList => _.groupBy(data, 'state');

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

type CaseName = 'confirmed' | 'deaths' | 'recovered';

export const getTotalCases = (data: TimeSeries[], name: CaseName): number[] => {
  const [lastItem] = data.slice(-1);
  const [preLastItem] = data.slice(-2);
  const diff = Number(lastItem[name]) - Number(preLastItem[name]);
  return [Number(lastItem[name]), Number(diff)];
};

export const extractCases = (cases: number[]) => {
  const [c, diff] = cases;
  return `${numberWithCommas(c)} (+${numberWithCommas(diff)})`;
};

export const getPopulation = (data: TransformedData[]) => _.sumBy(data, s => Number(s.population));

export const getCasesForState = (data: TransformedData[]) => {
  const population = getPopulation(data);
  const totalConfirmed = _.sumBy(data, item => getTotalCases(item.timeSeries, 'confirmed')[0]);
  const totalDeaths = _.sumBy(data, item => getTotalCases(item.timeSeries, 'deaths')[0]);
  const casesPerMillion = (1000000 * totalConfirmed) / population;

  return [totalConfirmed, totalDeaths, casesPerMillion];
};
