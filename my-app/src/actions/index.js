import axios from "axios";

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";

// return {type: FETCH_DATA_SUCCESS, friends: apiData}

export const getUsers = () => dispatch => {
  dispatch({ type: FETCH_DATA_START });

    axios
    .get('http://localhost:5001/api/users')
    .then(res => dispatch({type: FETCH_DATA_SUCCESS, users: res.data}))
    .catch(err => console.log(err));
  }