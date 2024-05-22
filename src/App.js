import React, { useReducer } from 'react';
import TodoComponent from './components/TodoApp';

// Definindo as ações do reducer
const ACTIONS = {
  ADD_TASK: 'add-task',
  TOGGLE_TASK: 'toggle-task',
  REMOVE_TASK: 'remove-task',
  SET_TASK: 'set-task',
};

// Definindo o reducer
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, newTask(action.payload.name)],
        task: '',
      };
    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, completed: !task.completed } : task
        ),
      };
    case ACTIONS.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    case ACTIONS.SET_TASK:
      return {
        ...state,
        task: action.payload.task,
      };
    default:
      return state;
  }
}

// Função para criar uma nova tarefa
function newTask(name) {
  return { id: Date.now(), name, completed: false };
}

function App() {
  const [state, dispatch] = useReducer(reducer, { tasks: [], task: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.task.trim()) {
      dispatch({ type: ACTIONS.ADD_TASK, payload: { name: state.task } });
    }
  };

  const handleChange = (event) => {
    dispatch({ type: ACTIONS.SET_TASK, payload: { task: event.target.value } });
  };
  
  const teste = 1;
  if(teste === 0){
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={state.task}
            onChange={handleChange}
            placeholder="Add a new task"
          />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {state.tasks.map(({ id, name, completed }) => (
            <li key={id}>
              <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                {name}
              </span>
              <button onClick={() => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: { id } })}>
                Toggle
              </button>
              <button onClick={() => dispatch({ type: ACTIONS.REMOVE_TASK, payload: { id } })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (<TodoComponent/>);
  }
}

export default App;