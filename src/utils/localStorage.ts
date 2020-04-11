import _ from 'lodash';
import axios from 'axios';
import * as util from './util';

const CONTAINER = 'data';

export const setDataToStorage = (key: string, type: any) => {
  const container = localStorage.getItem(CONTAINER);
  const result = { [key]: [...type] };
  try {
    if (!container) {
      localStorage.setItem(CONTAINER, JSON.stringify(result));
      return;
    }
    const parsedContainerData = JSON.parse(container);
    parsedContainerData[key] = [...type];
    localStorage.setItem(CONTAINER, JSON.stringify(parsedContainerData));
  } catch (e) {
    return result;
  }
};

export const getDataFromStorage = (key: string) => {
  const container = localStorage.getItem(CONTAINER);
  return container && JSON.parse(container)[key];
};

export const removeDataFromStorage = () => {
  localStorage.removeItem(CONTAINER);
};

export const getDataFromStore = async (type = '', url = '') => {
  const data = getDataFromStorage(type);

  if (!_.isNil(data) && !_.isEmpty(data)) {
    return data;
  }

  const fetchData = await axios.get(url);

  const keyName = 'name';

  const dataFromOutside = util.transformGlobalData(fetchData.data, keyName);
  setDataToStorage(type, dataFromOutside);
  return dataFromOutside;
};
