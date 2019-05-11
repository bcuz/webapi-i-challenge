import { 
  DELETE_FRIEND_START,
  DELETE_FRIEND_SUCCESS,
   FETCH_DATA_SUCCESS,
   FETCH_DATA_START,} from "../actions";

const defaults = {
  users: [],
  fetchingData: false,
  // delName: null
}

const rootReducer = (state = defaults, action) => {
  switch (action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        // error: "",
        fetchingData: true
      };
      case FETCH_DATA_SUCCESS:
      // console.log(action.payload);
      return {
        ...state,
        // error: "",
        fetchingData: false,
        users: action.users
      };
      case DELETE_FRIEND_START:
        return {
          ...state,
          // error: "",
          delName: null
        };
    case DELETE_FRIEND_SUCCESS:
      return {
        ...state,        
        delName: action.delName
      };
    default:
      return state;
    }
}

export default rootReducer;