import { combineReducers } from 'redux';
import memberReducer from './memberReducer';

export default combineReducers({
  member: memberReducer
});