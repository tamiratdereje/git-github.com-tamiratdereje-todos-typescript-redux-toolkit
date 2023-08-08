// Path: todos\src\features\todos\todosSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../../common/models/todoModel";
import todoService from "./todosServices";

interface TodoState {
  loading: boolean;
  error: string | null;
  data: Todo[];
  isSuccess: boolean
}

const initialState: TodoState = {
  loading: false,
  error: null,
  data: [],
  isSuccess: false
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (data, thunkApi) => {
    try {
      const response = await todoService.fetchTodos();
      
      return await response.json();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo: Todo, thunkApi) => {
    try {
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      return await response.json();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: {
    [fetchTodos.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchTodos.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true
    },
    [fetchTodos.rejected.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addTodo.pending.type]: (state) => {
      state.loading = true;
    },
    [addTodo.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = [...state.data, action.payload];
      state.isSuccess = true
    },
    [addTodo.rejected.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { reset } = todosSlice.actions;

export default todosSlice.reducer;
