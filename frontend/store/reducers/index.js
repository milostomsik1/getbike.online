import { combineReducers } from 'redux';
import auth from './auth.reducer';
import search from './search.reducer';

export default combineReducers({
  auth,
  search
});
