import { 
   FETCH_DATA_SUCCESS,
   FETCH_DATA_START,} from "../actions";

const defaults = {
  users: [],
  fetchingData: false,
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
    default:
      return state;
    }
}

export default rootReducer;