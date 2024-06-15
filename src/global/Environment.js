/**
 * @desc Get api URL based on current env
 */
export function getBaseUrl() {
  if (__DEV__) return 'http://182.70.123.235:5000/api';
  else return '';
  // if (__DEV__) return 'http://192.168.0.111:3000/api';
  // else return '';
}
