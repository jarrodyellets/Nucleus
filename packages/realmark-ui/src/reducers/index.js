import { combineReducers } from 'redux';
import userReducer from './userReducer';
import currentUserReducer from './currentUserReducer';
import errorReducer from './errorReducer';
import allUsersReducer from './allUsersReducer';

export default combineReducers({
  user: userReducer,
  currentUser: currentUserReducer,
  error: errorReducer,
  allUsers: allUsersReducer
});