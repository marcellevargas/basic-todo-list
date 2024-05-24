import React from "react";
import TodoComponent from "./components/TodoApp";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <TodoComponent />
    </ChakraProvider>
  );
}

export default App;
