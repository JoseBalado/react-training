export const API_URL = process.env.REACT_APP_API_URL;
export const WEB_APP_URL = process.env.REACT_APP_WEB_APP_URL;

export const REQUEST = (actionType: string) => `${actionType}_PENDING`;
export const SUCCESS = (actionType: string) => `${actionType}_FULFILLED`;
export const FAILURE = (actionType: string) => `${actionType}_REJECTED`;
