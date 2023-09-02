const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreatotrs = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const logger = require('redux-logger').logger;
const applyMiddleware = redux.applyMiddleware;

const CAKE_ORDER = "CAKE_ORDER";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICE_CREAM_ORDER = "ICE_CREAM_ORDER";
const ICE_CREAM_RESTOCKED = "ICE_CREAM_RESTOCKED";

// Cake Actions Creators :
function orderCake() {
   return {
       type: CAKE_ORDER,
       payload: 1
}
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}


// IceCream Actions Creators :
function orderIceCream() {
  return {
    type: ICE_CREAM_ORDER,
    payload: 1,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICE_CREAM_RESTOCKED,
    payload: qty,
  };
}


// initialStates

const initialCakesState = {
  numOfCakes: 10,
 
};

const initialIceCreamsState = {
  numOfIceCreams: 20,
};

// reducer : ( previousState, action ) => newState

const cakeReducer = (state = initialCakesState, action) => {
  switch (action.type) {
    case CAKE_ORDER:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};



const iceCreamReducer = (state = initialIceCreamsState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDER:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    case ICE_CREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

// combine reducers :
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});

// create store

const store = createStore(rootReducer, applyMiddleware(logger));

// store.getState(): gets the current state :
console.log("initalState: ", store.getState());


// store.subscribe(): listen to any state changes

const unsubscribe = store.subscribe(
  () => console.log("updatedState: ", store.getState())
);


// bind action creators:
const actions = bindActionCreatotrs(
  { orderCake, restockCake, orderIceCream , restockIceCream},
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockCake(4);
actions.restockIceCream(2);


// store.dispatch:

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(4));

// unsubscribe 

unsubscribe();

// store.dispatch(orderCake());

// console.log("currentState: ", store.getState());