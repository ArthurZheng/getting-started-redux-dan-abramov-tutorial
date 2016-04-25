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

const todos = (state = [{completed:false, id: 0, text: 'Eat Have Fun (Default First Item)'}], action) => {
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

const Filterlink = ({
  filter,
  currentFilter,
  children
}) => {
  if (filter === currentFilter){
    console.log('FilterLink children is ', {children});
    return <span>{children}</span>
  }

  return (
    <a href='#'
      onClick={ e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        });
      }}
    >
      {children}
    </a>
  );
};

const AddTodo = ({
  onAddClick
}) => {
    let input;

    return (
      <div>
        <input ref={node => {
          input = node;
        }} />
        <button onClick={() => {
          console.log('button onClick triggered ', input.value);

          onAddClick(input.value)
          input.value = '';

        }}>
        + Add Todo
        </button>
      </div>
    )
};

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
      break;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}

// a presentational component;
const Todo = ({
  onClick,
  completed, // pass in props so that this compnet become a pure presentational component
  text
}) => (
  <li
    onClick = {onClick}
    style = {{textDecoration:
    completed ?
    'line-through' :
    'none'
  }}
  >{text}</li>
);

const TodoList =({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

let nextTodoId = 10;
class TodoApp extends Component {
  render(){
    const {
      todos,
      visibilityFilter
    } = this.props;

      const visibleTodos = getVisibleTodos(
        todos,
        visibilityFilter
      );

    return (
      <div>
        <AddTodo
          onAddClick={text =>
            store.dispatch({
              type: 'ADD_TODO',
              id: nextTodoId++,
              text
            })
          }
        />

        <TodoList
          todos = {visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          }
        />
        <p>
          Show:
          {' '}
          <Filterlink
          filter='SHOW_ALL'
          currentFilter={visibilityFilter}
          >
          ALL
          </Filterlink>
          {' '}
          <Filterlink
          filter='SHOW_ACTIVE'
          currentFilter={visibilityFilter}
          >
          Aactive
          </Filterlink>
          {' '}
          <Filterlink
          filter='SHOW_COMPLETED'
          currentFilter={visibilityFilter}
          >
          Completed
          </Filterlink>
        </p>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('react')
  );
};

store.subscribe(render); // renders every time each time state changes
render();// renders initially
