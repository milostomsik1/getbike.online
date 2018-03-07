import * as types from '../types';

const find = payload => dispatch => {
  dispatch({type: types.SEARCH, payload});
};

const changeSearchInput = payload => dispatch => {
  dispatch({type: types.CHANGE_SEARCH_INPUT, payload});
};

export default {
  find,
  changeSearchInput
};