
const counter = (state = 0, action) => {
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

// const { createStore } = Redux;
// var createStore = Redux.createStore;
import { createStore } from 'redux';
//holde current state, let you dispatch action,
const store = createStore(counter); // pass in the reducer

console.log(store.getState());
store.dispatch({type: 'INCREMENT'});
console.log(store.getState());

const render = () => {
  document.body.innerText = store.getState();
  console.log(store.getState());
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'})
})
