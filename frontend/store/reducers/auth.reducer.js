import {
  LOG_IN,
  LOG_OUT
} from '../types';

const initialState = {
  loggedIn: null
};

const auth = (state = initialState, action) => {
  switch(action.type) {
    case LOG_IN:
      return { loggedIn: action.payload.loggedIn };
    case LOG_OUT:
      return { loggedIn: null };
    default:
      return state;
  }
};

export default auth;