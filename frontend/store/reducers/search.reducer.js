import * as types from '../types';

const initialState = {
  value: ''
};

const search = (state = initialState, action) => {
  switch(action.type) {
    case types.SEARCH:
      console.log(`Looking for: ${action.payload}`)
      return {
        ...state,
      };
    case types.CHANGE_SEARCH_INPUT:
      return {
        ...state,
        value: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default search;