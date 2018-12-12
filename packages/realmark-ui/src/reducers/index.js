import { combineReducers } from 'redux';
import memberReducer from './memberReducer';
import userReducer from './userReducer';

export default combineReducers({
  member: memberReducer,
  user: userReducer
});