import { FC } from "react"
import type { TodoItemType } from "../types"
import { TodoItem } from "./"

interface PropsType {
  todos: TodoItemType[]
  setEdit: (id: string) => void
  deleteTask: (id: string) => void
  setIsChecked: (id: string, checked: boolean) => void
}

const TodoList: FC<PropsType> = ({ todos, setEdit, deleteTask, setIsChecked }) => {
  return (
    <ul className="h-[85%] overflow-y-scroll hide-scrollbar">
      {todos?.map((todo: TodoItemType) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          setEdit={setEdit}
          deleteTask={deleteTask}
          setIsChecked={setIsChecked}
        />
      ))}
    </ul>
  )
}

export default TodoList