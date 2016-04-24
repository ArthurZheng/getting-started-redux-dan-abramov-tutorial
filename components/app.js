

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


const addCounter = (list) => {
  // return list.concat([0]);
  return [...list, 0];
}

const removeCounter = (list, index) {
  // return list.slice(0, index).concat(list.slice(index + 1));
  // return [
  //   ...list.slice(0, index),
  //   ...list.slice(index + 1)
  // ];
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index +1)
  ];
};

const incrementCounter = (list, index) => {
  return list
        .slice(0, index)
        .contact([list[index] + 1])
        .concat(list.slice(index + 1));
};

const toggleTodo = (todo) => {
  // return {
  //   ...todo,
  //   completed: !todo.completed
  // }
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: flase
        }
      ];
      break;
    default:
      return state;
  }
};


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
