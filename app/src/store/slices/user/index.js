/* eslint-disable no-param-reassign */
import { createSlice, createAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';

const incrementBy = createAction('incrementBy');
const decrementBy = createAction('decrementBy');

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
    multiply: {
      reducer: (state, action) => state * action.payload,
      prepare: value => ({ payload: value || 2 }), // fallback if the payload is a falsy value
    },
  },
  // "builder callback API", recommended for TypeScript users
  extraReducers: (builder) => {
    builder.addCase(incrementBy, (state, action) => state + action.payload);
    builder.addCase(decrementBy, (state, action) => state - action.payload);
  },
});

const user = createSlice({
  name: 'user',
  initialState: { name: '', age: 20 },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload; // mutate the state all you want with immer
    },
  },
  // "map object API"
  extraReducers: {
    [counter.actions.increment]: (state) => {
      state.age += 1;
    },
  },
});

const reducer = combineReducers({
  counter: counter.reducer,
  user: user.reducer,
});

export default reducer;
