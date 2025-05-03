import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "../shared/api/queryClient.jsx";
import TodoList from "../modules/todoList/TodoList.jsx";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import TodoListPagination from "../modules/todoListPagination/TodoListPagination.jsx";

function App() {

  return (
      <QueryClientProvider client={queryClient}>
            {/*<TodoListPagination/>*/}
            <TodoList/>
            <ReactQueryDevtools />
      </QueryClientProvider>
  )
}

export default App
