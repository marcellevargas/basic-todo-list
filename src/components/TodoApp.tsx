import React, { useReducer, FormEvent, ChangeEvent } from "react";
import { Task, State, Action } from "../interface/task";

const actions = {
  ADD_TASK: "add-task",
  TOGGLE_TASK: "toggle-task",
  REMOVE_TASK: "remove-task",
  SET_TASK: "set-task",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actions.ADD_TASK:
      if (action.payload.title !== undefined) {
      return {
        ...state,
        tasks: [...state.tasks, createTask(action.payload.title)],
        task: '',
      };
    }else {
      return state;
    }
    case actions.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, completed: !task.completed } : task
        ),
      };
    case actions.REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    case actions.SET_TASK:
      return {
        ...state,
        task: action.payload.title || '',
      };
    default:
      return state;
  }
}

const createTask = (title: string): Task => {
  return {
    id: Date.now(),
    title,
    completed: false,
  };
};

export default function TodoComponent() {
  const [state, dispatch] = useReducer(reducer, { tasks: [], task: "" });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (state.task.trim()) {
      dispatch({
        type: actions.ADD_TASK,
        payload: {
          title: state.task,
        },
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: actions.SET_TASK,
      payload: {
        title: event.target.value,
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={state.task}
          onChange={handleChange}
          placeholder="Create a new task"
        />
        <button type="submit">Create Task</button>
      </form>

      <ul>
        {state.tasks.map(({ id, title, completed }: Task) => (
          <li key={id}>
            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
              {title}
            </span>
            <button onClick={() => dispatch({ type: actions.TOGGLE_TASK, payload: { id } })}>
              Toggle
            </button>
            <button onClick={() => dispatch({ type: actions.REMOVE_TASK, payload: { id } })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
