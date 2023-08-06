// Path: todos\src\features\todos\todosSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../../common/models/todoModel";

interface TodoState {
  loading: boolean;
  error: string | null;
  data: Todo[];
}

const initialState: TodoState = {
  loading: false,
  error: null,
  data: [],
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (data, thunkApi) => {
    try {
      const response = await fetch("http://localhost:3001/todos");
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
  reducers: {},
  extraReducers: {
    [fetchTodos.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchTodos.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.data = action.payload;
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
    },
    [addTodo.rejected.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default todosSlice.reducer;
