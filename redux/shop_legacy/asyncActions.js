const redux = require("redux");
const createStore = redux.legacy_createStore;
const axios = require('axios');

const thunkMiddleware = require('redux-thunk').default;
const applyMiddleware = redux.applyMiddleware;

// initalState
const initalState = {
    loading: false,
    users: [],
    error: ""
};


// action types 
const FETCH_USERS_REQUETED = "FETCH_USERS_REQUETED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

// fetch function request : action creator

const fetchUserRequested = () => {
    return {
      type: FETCH_USERS_REQUETED,
    };
}

// fetch function Success : action creator

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users,
  };
};

// fetch function error : action creator

const fetchUserFailure = error => {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  };
};


const reducer = (state = initalState, action) => {
    switch (action.type) {
      case FETCH_USERS_REQUETED:
        return {
          ...state,
          loading: true,
        };
      case FETCH_USER_SUCCEEDED:
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
      case FETCH_USER_FAILED:
        return {
          
          loading: false,
          users: [],
          error: action.payload
        };
      default:
       return state;
    }
}

// function to get users from api call

const fetchUsers = () => {
 return function(dispatch)
 {
        //  dispatch fetchuserrequested
     dispatch(fetchUserRequested())
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      const users = response.data.map((user) => user.id);
      // dispatch fetchusersuccess
        dispatch(fetchUserSuccess(users));
    })
    .catch((error) => {
      // dispatch fetchuserfailed
        dispatch(fetchUserFailure(error.message));
    });
 }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(
    () => console.log(store.getState())
)

store.dispatch(fetchUsers());