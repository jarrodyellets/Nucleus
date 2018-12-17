import { combineReducers } from 'redux';
import memberReducer from './memberReducer';
import userReducer from './userReducer';
import currentUserReducer from './currentUserReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  member: memberReducer,
  user: userReducer,
  currentUser: currentUserReducer,
  error: errorReducer
});