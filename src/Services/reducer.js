import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './action';

const initialState = {
  data: [],
  error: null,
  isLoading: false,
};
const removeDuplicates = (array, key) => {
  return array.reduce((acc, current) => {
    const x = acc.find(item => item[key] === current[key]);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      let a = {
        ...state,
        isLoading: true,
      };
      return a

    case FETCH_DATA_SUCCESS:
      let actionData= action.data
      if(state.data.data){
      actionData.data = [...state.data.data,...actionData.data]
      actionData.data = removeDuplicates(actionData.data,"id")
      }
      let b = {
        ...state,
        isLoading: false,
        data: actionData,
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
