import { ERROR } from '../actions/types';

const initialState ={
  error: ''
}

export default function(state = initialState, action){
  switch (action.type){
    case ERROR:
      return {
        ...state,
        error: action.payload.error
      };
      default :
        return state;
  }
}