import { useReducer } from "react";

const actions = {
  ADD_TASK: "add-task",
  TOGGLE_TASK: "toggle-task",
  REMOVE_TASK: "remove-task",
  SET_TASK: "set-task",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_TASK:
      return { ...state, task: action.payload.task };
    
    case actions.ADD_TASK:
        return{
            ...state,
            tasks: [...state.tasks, createTask(action.payload.title)],
            task:''
        }
    default:
      return state;
  }
}

const createTask = (title) => {
    return {
        id: Date.now(),
        title,
        completed: false
    }
}

export default function TodoComponent() {
  const [state, dispatch] = useReducer(reducer, { tasks: [], task: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    if(state.task.trim()){
        dispatch({
            type: actions.ADD_TASK,
            payload: {
                title: state.task
            }
        })
    }
  }

  const handleChange = (event) => {
    dispatch({
      type: actions.SET_TASK,
      payload: {
        task: event.target.value,
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
        {state.tasks.map(({id, title, completed})=> (
            <li key={id}>
                {title}
            </li>
        ))}
      </ul>
    </div>
  );
}
