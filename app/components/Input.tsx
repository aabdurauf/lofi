import { FC } from "react"
import { IoMdAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

interface PropsType {
  inputVal: string
  id: string | null
  isEditing: boolean
  addTask: () => void
  handleEdit: (id: string | null) => void
  setInputVal: React.Dispatch<React.SetStateAction<string>>
}

const Input: FC<PropsType> = ({ id, isEditing, handleEdit, inputVal, setInputVal, addTask }) => {
  return (
    <div className="w-full flex items-center mb-4">
      <input
        type="text"
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        className="w-[70%] bg-transparent outline-none text-white border-[1px] border-r-0 py-1 px-2"
      />
      {isEditing ? (
        <button
          className="w-[30%] cursor-pointer border-[1px] py-2"
          onClick={() => handleEdit(id)}
        >
          <FaRegEdit className="mx-auto text-white" />
        </button>
      ) : (
        <button
          className="w-[30%] cursor-pointer border-[1px] py-2"
          onClick={addTask}
        >
          <IoMdAdd className="mx-auto text-white" />
        </button>
      )}
    </div>
  )
}

export default Input