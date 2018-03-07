import * as types from '../types';

const login = () => dispatch => {
  dispatch({type: types.LOG_IN, payload: {loggedIn: true}});
  console.log('Logged in.');
};

const logout = () => dispatch => {
  dispatch({type: types.LOG_OUT, payload: {loggedIn: true}});
  console.log('Logged out.')
};

export default {
  login,
  logout
};