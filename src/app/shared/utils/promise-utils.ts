export const isPromise = (value: any): boolean => {
  return value !== null && typeof value === 'object'
    ? value && typeof value.then === 'function'
    : false;
};
