const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
    numOfCakes: 10
}

const cakeSlice = createSlice({
    name: "cake",
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfCakes--
        },
        restocked: (state, action) => {
            state.numOfCakes += action.payload
        }
  }
});

// default export
module.exports = cakeSlice.reducer;
// named export
module.exports.cakeActions = cakeSlice.actions;