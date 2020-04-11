export const getFlagFromStorage = (key: string, defaultValue = true) => {
  const result = localStorage.getItem(key);

  return result === null
    ? defaultValue
    : JSON.parse(result);
};

export const setFlagToStorage = (key: string, flag: boolean) => (
  localStorage.setItem(key, JSON.stringify(flag))
);
