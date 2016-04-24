

// const { createStore } = Redux;
// var createStore = Redux.createStore;
//holde current state, let you dispatch action,

// const createStore = (reducer) => {
//   let state;
//   let listeners = [];
//
//   const getState = () => state;
//
//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach(listener => listener() );
//   };
//
//   const subscribe = (listener) => {
//     listeners.push(listener);
//     return () => {
//       listeners = listeners.filter( l => l !== listener);
//     };
//   };
//   dispatch({});
//   return { getState, dispatch, subscribe};
// };


// const store = createStore(counter); // pass in the reducer
//
// console.log(store.getState());
// store.dispatch({type: 'INCREMENT'});
// console.log(store.getState());
//
// const render = () => {
//   document.body.innerText = store.getState();
//   console.log(store.getState());
// };
//
// store.subscribe(render);
// render();
//
// document.addEventListener('click', () => {
//   store.dispatch({type: 'INCREMENT'})
// })


const counter_reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
      break;
    case 'DECREMENT':
      return state - 1;
      break;
    default:
      return state;
  }
}

const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
  <h1>{value}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </div>
);

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const store = createStore(counter_reducer);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.getElementById('react')
  );
};

store.subscribe(render);
render();
