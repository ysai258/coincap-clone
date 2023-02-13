export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataRequest = (limit=50,offset=0) => ({ type: FETCH_DATA_REQUEST, payload: { limit,offset } });
export const fetchDataSuccess = (data) => ({ type: FETCH_DATA_SUCCESS, data });
export const fetchDataFailure = (error) => ({ type: FETCH_DATA_FAILURE, error });
