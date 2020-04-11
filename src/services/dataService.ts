import * as localStorage from 'utils/localStorage';

const GLOBAL_DATA = 'globalData';
const GLOBAL_DATA_URL = 'https://narek-t.github.io/covid19/timeseries_global.json';
const US_DATA = 'usData';
const US_DATA_URL = 'https://narek-t.github.io/covid19/timeseries_US.json';

export const getGlobalData = () => localStorage.getDataFromStore(GLOBAL_DATA, GLOBAL_DATA_URL);
export const getUSData = () => localStorage.getDataFromStore(US_DATA, US_DATA_URL);
