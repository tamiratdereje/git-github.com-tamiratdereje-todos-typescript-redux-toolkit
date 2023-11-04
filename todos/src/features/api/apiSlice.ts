import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SingleTodoResponse, Todo, TodoResponse } from "../../types/todo/todo";
import {
  LoginRequest,
  UserData,
  UserRequest,
  UserResponse,
} from "../../types/user/user";

const user: any = JSON.parse(localStorage.getItem("user") as string);

export const apiSlice : any = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todos-type.onrender.com/api/v1",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => ({
        url: "/todo",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: TodoResponse) => {
        if (response.data === null) {
          return [];
        }

        return response.data.map((todo) => ({
          id: todo.id,
          description: todo.description,
          category: todo.category,
          priority: todo.priority,
          dueDate: todo.dueDate,
          status: todo.status,
          createdAt: todo.createdAt,
          notes: todo.notes ?? "",
        }));
      },
    }),

    // endpoint for getting one todo
    getTodo: builder.query<Todo, string>({
      query: (id) => ({
        url: `/todo/${id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },

    }),
      transformResponse: (response: SingleTodoResponse) => {
        if (response.data === null) {
          throw new Error(response.error ?? "Error while fetching todo");
        }
        const responseTodo = response.data;
        const todo : Todo = {
          id: responseTodo.id,
          description: responseTodo.description,
          category: responseTodo.category,
          priority: responseTodo.priority,
          dueDate: responseTodo.dueDate,
          status: responseTodo.status,
          createdAt: responseTodo.createdAt,
          notes: responseTodo.notes ?? "",
        };
        return todo;
      },
    }),



    addTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: "/todo",
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        todo,
      }),
      transformResponse: (response: SingleTodoResponse) => {
        if (response.data === null) {
          throw new Error(response.error ?? "Error while creating todo");
        }
        const responseTodo = response.data;
        const todo : Todo = {
          id: responseTodo.id,
          description: responseTodo.description,
          category: responseTodo.category,
          priority: responseTodo.priority,
          dueDate: responseTodo.dueDate,
          status: responseTodo.status,
          createdAt: responseTodo.createdAt,
          notes: responseTodo.notes ?? "",
        };
        return todo;
      },
    }),

    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todo/${todo.id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: { todo },
      }),
      transformResponse: (response: SingleTodoResponse) => {
        if (response.data === null) {
          throw new Error(response.error ?? "Error while updating todo");
        }
        const responseTodo = response.data;
        const todo : Todo = {
          id: responseTodo.id,
          description: responseTodo.description,
          category: responseTodo.category,
          priority: responseTodo.priority,
          dueDate: responseTodo.dueDate,
          status: responseTodo.status,
          createdAt: responseTodo.createdAt,
          notes: responseTodo.notes ?? "",
        };
        return todo;
      },
    }),

    deleteTodo: builder.mutation<Todo, string>({
      query: (id) => ({
        url: `/todo/${id}`,
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }),
      transformResponse: (response: SingleTodoResponse) => {
        if (response.data === null) {
          throw new Error(response.error ?? "Error while deleting todo");
        }
        const responseTodo = response.data;
        const todo : Todo = {
          id: responseTodo.id,
          description: responseTodo.description,
          category: responseTodo.category,
          priority: responseTodo.priority,
          dueDate: responseTodo.dueDate,
          status: responseTodo.status,
          createdAt: responseTodo.createdAt,
          notes: responseTodo.notes ?? "",
        };
        return todo;
      },
    }),

    resgisterUser: builder.mutation<UserData, UserRequest>({
      query: (val: UserRequest) => ({
        url: `/user`,
        method: "POST",
        body: val,
      }),
      transformResponse: (response: UserResponse) => {
        if (response.data === null) {
          throw new Error(response.error ?? "Error while registering user");
        }
        const userResponse = response.data;
        const user = {
          id: userResponse.id,
          name: userResponse.name,
          email: userResponse.email,
          createdAt: userResponse.createdAt,
          password: userResponse.password,
        };
        return user;
      },
    }),

    loginUser: builder.mutation({
      query: (val: LoginRequest) => ({
        url: `/user/login`,
        method: "POST",
        body: val,
      }),
      transformResponse: (response: UserResponse) => {
        if (response.data === null) {
          throw new Error(response.error ?? "Error while registering user");
        }
        if (response.data) {
          localStorage.setItem("user", JSON.stringify({data: response.data, token: response.token}));
        }
        const userResponse = response.data;
        const user = {
          id: userResponse.id,
          name: userResponse.name,
          email: userResponse.email,
          createdAt: userResponse.createdAt,
          password: userResponse.password,
        } as UserData;
        const token = response.token;
        return { user: user, token: token };
      },
    }),

  
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useResgisterUserMutation,
  useLoginUserMutation,
  useGetTodoQuery,
} = apiSlice;
