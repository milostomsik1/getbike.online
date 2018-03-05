import {
  LOG_IN,
  LOG_OUT
} from '../types';

const login = () => dispatch => {
  dispatch({type: LOG_IN, payload: {loggedIn: true}});
  console.log('Logged In.');
};

const logout = () => dispatch => {
  dispatch({type: LOG_OUT});
  console.log('Logged Out.');
};

export default {
  login,
  logout
};