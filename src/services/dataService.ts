import axios from 'axios';

const GLOBAL_DATA_URL = 'https://narek-t.github.io/covid19/timeseries_global.json';
const US_DATA_URL = 'https://narek-t.github.io/covid19/timeseries_US.json';

export const getGlobalData = () => axios.get(GLOBAL_DATA_URL);
export const getUSData = () => axios.get(US_DATA_URL);
