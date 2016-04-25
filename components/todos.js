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

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active){
    console.log('FilterLink children is ', {children});
    return <span>{children}</span>
  }

  return (
    <a href='#'
      onClick={ e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

class Filterlink extends Component {

  componentDidMount(){
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate() //independently redeners when the store updates
    );
  }

  compoentWillUnmount(){
      this.unsubscribe(); // clean up the subscribtion;
  }

  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <Link
        active = {
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
      {props.children}
      </Link>
    )
  }
}

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

const Footer = () => (
  <p>
    Show:
    {' '}
    <Filterlink
    filter='SHOW_ALL'
    >
    ALL
    </Filterlink>
    {' '}
    <Filterlink
    filter='SHOW_ACTIVE'
    >
    Aactive
    </Filterlink>
    {' '}
    <Filterlink
    filter='SHOW_COMPLETED'
    >
    Completed
    </Filterlink>
  </p>
);


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
const TodoApp = ({
  todos,
  visibilityFilter
}) => (
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
          todos = {
            getVisibleTodos(
                todos,
                visibilityFilter
              )
          }
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id
            })
          }
        />

      <Footer />
      </div>
);


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
