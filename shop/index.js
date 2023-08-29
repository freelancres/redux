const redux = require("redux");
const createStore = redux.legacy_createStore;


const CAKE_ORDER = "CAKE_ORDER";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

// Actions Creators :
function orderCake() {
   return {
       type: CAKE_ORDER,
       quantity: 1
}
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    quantity: qty,
  };
}


// initialState

const initialState = {
    numOfCakes: 10,
    numOfIceCreams:20
};

// reducer : ( previousState, action ) => newState

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CAKE_ORDER:
        return {
          ...state,
          numOfCakes: state.numOfCakes - action.quantity,
        };
      case CAKE_RESTOCKED:
        return {
          ...state,
          numOfCakes: state.numOfCakes + action.quantity,
        };
      default:
        return state;
    }
}


// create store

const store = createStore(reducer);

// store.getState(): gets the current state :
console.log("initalState: ", store.getState());


// store.subscribe(): listen to any state changes

const unsubscribe = store.subscribe(
    () => console.log("updatedState: ", store.getState())
)


// store.dispatch:

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

// unsubscribe 

unsubscribe();

store.dispatch(orderCake());

console.log("currentState: ", store.getState());