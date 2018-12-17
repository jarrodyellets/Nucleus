import { SEARCH} from '../actions/types';

const initialState ={
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  imageURL: '',
  location: '',
  posts: [],
  friends: [],
  id: '',
}

export default function(state = initialState, action){
  switch (action.type){
    case SEARCH:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        username: action.payload.userName,
        imageURL: action.payload.imageURL,
        location: action.payload.location,
        posts: action.payload.posts,
        friends: action.payload.friends,
        id: action.payload.id,
      };
      default :
        return state;
  }
}