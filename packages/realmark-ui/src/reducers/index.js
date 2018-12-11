import { combineReducers } from 'redux';
import memberReducer from './memberReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  member: memberReducer,
  user: userReducer,
  error: errorReducer
});