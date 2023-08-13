import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../common/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { deleteTodo, fetchTodos, reset } from "../features/todos/todosSlice";

export const TodoDetail = () => {
  const { id } = useParams();
  const { data, error, loading, isSuccess } = useAppSelector((state) => state.todos);
  let todo: any = data.find((todo) => todo.id === id);
  // const navigate = useNavigate();
  const [deleteT, setDeleteT] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("todo detail page");
    
    if (error) {
      console.log("error while fetching todo");
      setDeleteT(false);
      return ()=>{
        dispatch(reset());
      }
    }
    if (deleteT) {
      console.log("successfully deleted")
      setDeleteT(false);
      navigate("/todos")
    }
    if (todo === undefined) {
      navigate("/todos");
    }
  }, [navigate, todo, isSuccess, loading, error, deleteT, dispatch]);

  const onDelete = () => {
    setDeleteT(true);
    console.log("delete todo");
    dispatch(deleteTodo(todo.id));
    
  };

  return (
    <div className="flex-1 items-center p-10  bg-gray-900 justify-center">
      {todo === undefined ? (
        <div className="flex-1 items-center p-10 text-xs text-white  bg-gray-900">
          loading...
        </div>
      ) : (
        <div className="h-full flex items-center m-auto w-1/3 justify-center">
          <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
            <span className="text-gray-400 pb-2 mb-2 border-b-2 border-gray-700">
              {Date.parse(todo.dueDate) < Date.now() ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </span>
            <span className="font-medium text-lg leading-none text-gray-300 title-font border-b-2 border-gray-700">
              {new Date(todo.dueDate).toLocaleDateString([], {
                day: "numeric",
              })}
            </span>
            <span className="font-medium text-lg leading-none text-gray-300 title-font">
              {new Date(todo.dueDate).toLocaleDateString([], {
                month: "long",
              })}
            </span>
          </div>
          <div className="flex-grow pl-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-indigo-400 mb-1">
              {todo.category}
            </h2>
            <span className="title-font font-medium text-white pr-2">
              Priority:
            </span>
            <span className="title-font font-medium text-white">
              {todo.priority}
            </span>
            <p className="leading-relaxed mb-5 text-gray-400">
              {todo.description}
            </p>
            <a className="inline-flex items-center">
              <span className="title-font font-medium text-white">Status:</span>
              <span className="flex-grow flex flex-col pl-3">
                <span className="title-font font-medium text-white">
                  {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                </span>
              </span>
            </a>
          </div>
          <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
            <span className="text-gray-400 pb-2 mb-2 border-b-2 border-gray-700">
              <button
                onClick={() => navigate(`/todos/${todo.id}/edit`)}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 hover:text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </span>
            <span className="font-medium text-lg leading-none text-gray-300 title-font border-b-2 border-gray-700">
              <button
                onClick={onDelete}
                className="text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500 hover:text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </button>
            </span>
            <span className="font-medium text-lg leading-none text-gray-300 title-font "></span>
          </div>
        </div>
      )}
    </div>
  );
};
