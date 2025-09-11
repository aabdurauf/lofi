import { FC, useState } from 'react'
import { Input, TodoList } from "./";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { todoActions } from "../lib/features/todosSlice";
import { IoCloseSharp } from "react-icons/io5";
import { AnimatePresence, motion } from "motion/react";

interface PropsType {
  isModalOpen: boolean
  setIsModalOpen: (type: boolean) => void
}

const TodoModal: FC<PropsType> = ({ isModalOpen, setIsModalOpen }) => {
  const [inputVal, setInputVal] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const addTask = (): void => {
    if (inputVal.trim() === "") {
      console.log("Please provide value");
    } else {
      dispatch(
        todoActions.addItem({
          id: new Date().getTime().toString(),
          name: inputVal,
          completed: false,
        })
      );
    }
    setInputVal("");
  };

  const handleEdit = (editingId: string | null): void => {
    dispatch(todoActions.handleEdit({ editingId, inputVal }));
    setInputVal("");
    setEditingId(null);
    setIsEditing(false);
  };

  const setEdit = (id: string): void => {
    const todo = todos.find(todo => todo.id === id)

    if (!todo) return

    if (todo.completed) {
      console.log("Task is completed!");
      return
    }

    setInputVal(todo.name)
    setEditingId(todo.id)
    setIsEditing(true)
  };

  const deleteTask = (id: string): void => {
    dispatch(todoActions.deleteTask({ id }));
  };

  const setIsChecked = (id: string, checked: boolean): void => {
    dispatch(todoActions.setIsChecked({ id, checked }));
  };

  return (
    <AnimatePresence initial={false}>
      {isModalOpen && (
        <motion.div
          initial={{ x: 0, y: -30, rotate: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          exit={{ x: 0, y: -30, rotate: 0, opacity: 0 }}
          className="w-full sm:w-[500px] h-[calc(100vh-100px)] rounded-lg p-5 mx-auto z-10 relative overflow-y-hidden backdrop-blur-md bg-white/10"
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="mb-2 ml-auto block"
          >
            <IoCloseSharp className="text-white text-2xl cursor-pointer" />
          </button>
          <Input
            id={editingId}
            addTask={addTask}
            inputVal={inputVal}
            isEditing={isEditing}
            handleEdit={handleEdit}
            setInputVal={setInputVal}
          />
          <TodoList
            todos={todos}
            setEdit={setEdit}
            deleteTask={deleteTask}
            setIsChecked={setIsChecked}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TodoModal