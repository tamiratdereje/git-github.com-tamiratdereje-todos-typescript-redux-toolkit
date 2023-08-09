// Path: todos\src\features\todos\todosSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../../common/models/todoModel";
import todoService from "./todosServices";
import thunk from "redux-thunk";
import { useAppSelector } from "../../common/hooks/useTypedSelector";
import { RootState } from "../../app/store";

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
      const state = thunkApi.getState() as RootState;
      const token = state.user.auth.token;
      
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    };
    console.log("headers")
      const response = await todoService.fetchTodos(headers);
      console.log("WHat is thip")
      console.log(response.data)
      console.log("whati i s end")
      const todos: Todo[] = response.data.map((todo: Todo) => {
        return {
          id: todo.id,
          description: todo.description,
          category: todo.category,
          priority: todo.priority,
          dueDate: todo.dueDate,
          status: todo.status,
          createdAt: todo.createdAt,
          notes: todo.notes??""
        };
      });
      console.log("todos")
      console.log(todos);
      console.log("todos")
      return todos;

    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.message });
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo: Todo, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const token = state.user.auth.token;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      };   

      const response = await todoService.addTodo(todo, headers);
      const todos: Todo = {
        id: response.data.id,
        description: response.data.description,
        category: response.data.category,
        priority: response.data.priority,
        dueDate: response.data.dueDate,
        status: response.data.status,
        createdAt: response.data.createdAt,
        notes: "response.data.notes"??""
      };
      console.log(todos);
      return todos;
      
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
      console.log("action.payload");
      console.log(action.payload);  

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
