import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './action';

const initialState = {
  data: [],
  error: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      let a = {
        ...state,
        isLoading: true,
      };
      return a

    case FETCH_DATA_SUCCESS:
      let b = {
        ...state,
        isLoading: false,
        data: action.data,
      };
      return b

    case FETCH_DATA_FAILURE:
      let c = {
        ...state,
        error: action.error,
        isLoading: false,
      };
      return c

    default:
      return state;
  }
};
