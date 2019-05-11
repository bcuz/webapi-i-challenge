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

export const DELETE_FRIEND_START = "DELETE_FRIEND_START";
export const DELETE_FRIEND_SUCCESS = "DELETE_FRIEND_SUCCESS";

  export const deleteUser = id => dispatch => {
    dispatch({ type: DELETE_FRIEND_START });  

    return axios
    .delete(`http://localhost:5001/api/users/${id}`)
      .then(res => {
        console.log(res);
        
        dispatch({type: DELETE_FRIEND_SUCCESS, delName: res.data.name})
      })
  }