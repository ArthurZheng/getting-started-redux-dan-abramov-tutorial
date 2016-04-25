import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Component } from 'react';
import { combineReducers } from 'redux';


const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}

const todos = (state = [{completed:false, id: 0, text: 'Eat Have Fun'}], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
      break;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter // ES6 object literal shorthand notation
});

const store = createStore(todoApp);

let nextTodoId = 10;
class TodoApp extends Component {
  render(){
    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          console.log('button onClick triggered ', this.input.value);
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          });
          this.input.value = '';

        }}>
        + Add Todo
        </button>

        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}>{todo.text}</li>
          )}
        </ul>
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
    todos={store.getState().todos}
    />,
    document.getElementById('react')
  );
};

store.subscribe(render);
render();
