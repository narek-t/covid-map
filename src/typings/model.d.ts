type ProviderInterface = any;

interface TimeSeries {
  date: string;
  confirmed: number;
  deaths: number;
  recovered?: number;
}
interface TransformedData {
  name: string;
  lat: string;
  lng: string;
  timeSeries: TimeSeries[];
  combinatedName?: string;
  state?: string;
  population?: string;
  code?: string;
  flag?: string;
}

interface USDataList {
  [key: string]: TransformedData[];
}
