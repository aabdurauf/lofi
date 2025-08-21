import { FC } from "react"
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import type { TodoItemType } from "../types";

interface PropsType {
  todo: TodoItemType;
  setEdit: (id: string) => void;
  deleteTask: (e: string) => void;
  setIsChecked: (id: string, checked: boolean) => void;
}

const TodoItem: FC<PropsType> = ({ todo, setEdit, deleteTask, setIsChecked }) => {
  const handleCheckboxChange = (): void => {
    setIsChecked(todo.id, !todo.completed);
  };

  return (
    <li key={todo.id} className="w-full py-1 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <input
          id={todo.id}
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
          className="outline-none border-none cursor-pointer"
        />
        <label
          className="text-white cursor-pointer"
          htmlFor={todo.id}
        >
          {todo.name}
        </label>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="text-white border-1 border-white py-1 px-2 rounded-2xl cursor-pointer hover:bg-white hover:text-black"
          onClick={() => setEdit(todo.id)}
        >
          <FaRegEdit />
        </button>
        <button
          className="text-white border-1 border-white py-1 px-2 rounded-2xl cursor-pointer hover:bg-white hover:text-black"
          onClick={() => deleteTask(todo.id)}
        >
          <MdDeleteOutline />
        </button>
      </div>
    </li>
  )
}

export default TodoItem