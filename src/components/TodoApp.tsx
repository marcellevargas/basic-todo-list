import React, { useReducer, FormEvent, ChangeEvent, useState } from "react";
import { Task, State, Action } from "../interface/task";
import {
  Button,
  Stack,
  HStack,
  Box,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

const actions = {
  ADD_TASK: "add-task",
  TOGGLE_TASK: "toggle-task",
  REMOVE_TASK: "remove-task",
  SET_TASK: "set-task",
  EDIT_TASK: "edit-task",
  SELECT_TASK: "select_task",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actions.ADD_TASK:
      if (action.payload.title !== undefined) {
        return {
          ...state,
          tasks: [...state.tasks, createTask(action.payload.title)],
          task: "",
        };
      } else {
        return state;
      }
    case actions.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
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
        task: action.payload.title || "",
      };
    case actions.EDIT_TASK:
      return {
        ...state,
        tasks: editTask(action.payload, state),
        task: "",
      };
    case actions.SELECT_TASK:
      return {
        ...state,
        task: action.payload.title || "",
      };
    default:
      return state;
  }
}

const createTask = (title?: string): Task => {
  return {
    id: Date.now(),
    title,
    completed: false,
  };
};

const editTask = (payload: Task, state: State): Task[] => {
  return state.tasks.map((task) =>
    task.id === payload.id ? { ...task, title: payload.title } : task
  );
};

export default function TodoComponent() {
  const [state, dispatch] = useReducer(reducer, { tasks: [], task: "" });
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (editingTaskId !== null) {
      if (state.task.trim()) {
        dispatch({
          type: actions.EDIT_TASK,
          payload: {
            id: editingTaskId,
            title: state.task,
          },
        });
        setEditingTaskId(null);
      }
    } else {
      if (state.task.trim()) {
        dispatch({
          type: actions.ADD_TASK,
          payload: {
            title: state.task,
          },
        });
      }
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
    <div className="App">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        flexDirection="column"
        width="100vw"
        rowGap="15px"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          width={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        >
          <form onSubmit={handleSubmit}>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              alignItems={{ base: "center", md: "stretch" }}
              justifyContent={{ base: "center", md: "flex-start" }}
              width="100%"
            >
              <Input
                type="text"
                value={state.task}
                onChange={handleChange}
                placeholder="Create a new task"
                width="100%"
              />
              <Button
                colorScheme="teal"
                size="md"
                type="submit"
                padding="5"
                width="100%"
              >
                {editingTaskId !== null ? "Edit Task" : "Create Task"}
              </Button>
            </Stack>
          </form>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          width={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
          maxHeight="40vh"
          overflowY="auto"
        >
          <List spacing={3} mt={4} width="100%">
            {state.tasks.map(({ id, title, completed }) => (
              <ListItem key={id} p={2} bg="gray.50" rounded="md" shadow="sm">
                <HStack justifyContent="space-between">
                  <Text
                    style={{
                      textDecoration: completed ? "line-through" : "none",
                    }}
                    onClick={() => {
                      if (id !== undefined) {
                        dispatch({
                          type: actions.SELECT_TASK,
                          payload: { id, title, completed },
                        });
                        setEditingTaskId(id);
                      }
                    }}
                  >
                    {title}
                  </Text>

                  <HStack spacing={2}>
                    <Button
                      colorScheme="teal"
                      size="md"
                      onClick={() =>
                        dispatch({ type: actions.TOGGLE_TASK, payload: { id } })
                      }
                    >
                      Toggle
                    </Button>
                    <Button
                      colorScheme="teal"
                      size="md"
                      onClick={() =>
                        dispatch({ type: actions.REMOVE_TASK, payload: { id } })
                      }
                    >
                      Remove
                    </Button>
                  </HStack>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );
}