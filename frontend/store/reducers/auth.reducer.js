import * as types from '../types';

const initialState = {
  loggedIn: null
};

const auth = (state = initialState, action) => {
  switch(action.type) {
    case types.LOG_IN:
      return {
        ...state,
        loggedIn: action.payload.loggedIn
      };
    case types.LOG_OUT:
      return {
        ...state,
        loggedIn: null
      };
    default:
      return {
        ...state
      };
  }
};

export default auth;