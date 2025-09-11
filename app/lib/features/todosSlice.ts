import { createSlice } from "@reduxjs/toolkit";
import type { TodoItemType } from "../../types";

interface TodosState {
  todos: TodoItemType[]
}

const initialState: TodosState = {
  todos: []
}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      state.todos.push({
        id: newItem.id,
        name: newItem.name,
        completed: newItem.completed,
      })
    },
    handleEdit: (state, action) => {
      state.todos = state.todos.map(todo => todo.id === action.payload.editingId ? { ...todo, name: action.payload.inputVal } : todo)
    },
    deleteTask: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    setIsChecked: (state, action) => {
      state.todos = state.todos.map(todo => todo.id === action.payload.id ? { ...todo, completed: action.payload.checked } : todo)
    }
  }
})

export const todoActions = todosSlice.actions;