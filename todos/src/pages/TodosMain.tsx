import React, { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../common/hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/todos/todosSlice";
import { fetchTodos } from "../features/todos/todosSlice";
export const TodosMain = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, data, isSuccess } = useAppSelector(
    (state) => state.todos
  );
  const { auth } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      console.log("error");
    }

    if (!auth) {
      console.log("not authenticated");
      navigate("/login");
    }
    console.log("fetching todos dispatched");
    dispatch(fetchTodos());
    return () => {
      dispatch(reset());
    };
  }, [auth, navigate, error, dispatch]);

  if (loading) {
    return (
      <div className="flex-1 items-center p-10 text-xs text-white  bg-gray-900">
        loading...
      </div>
    );
  }

  return (
    <div className="flex-1 items-center p-10  bg-gray-900">
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container flex-1 px-0 py-0 mx-auto ">
          <div className="flex flex-wrap -mx-4 -my-8 justify-items-center">
            {data.length > 0 ? (
              data.map((todo) => (
                <div
                  key={todo.id}
                  className="py-8 px-4 lg:w-1/3 border-l-2 border-l-lime-600 border-r-dashed mx-auto w-1/2 border-r-lime-600	my-4 rounded-lg mx-1"
                  onClick={() => navigate(`/todos/${todo.id}`)}
                >
                  <div className="h-full flex items-start">
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
                      <span className="font-medium text-lg leading-none text-gray-300 title-font ">
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
                      <p className="leading-relaxed mb-5">{todo.description}</p>
                      <a className="inline-flex items-center">
                        <span className="title-font font-medium text-white">
                          Status:
                        </span>
                        <span className="flex-grow flex flex-col pl-3">
                          <span className="title-font font-medium text-white">
                            {todo.status.charAt(0).toUpperCase() +
                              todo.status.slice(1)}
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
                          onClick={() => navigate(`/todos/${todo.id}/delete`)}
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
                </div>
              ))
            ) : (
              <div className="flex-1 items-center p-10 text-xs text-white  bg-gray-900">
                No todos found
              </div>
            )}
          </div>
        </div>
      </section>
      <div>
        <div className="fixed bottom-1/4 right-0 ...">
          <button
            onClick={() => {
              dispatch(reset());
              navigate("/createTodos");
            }}
            type="button"
            className="flex flex-row w-full px-4 py-2 mt-6 text-sm font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg hover:bg-blue-200 focus:outline-none focus:bg-primary-700"
          >
            <span className="text-white pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
            <span className="text-white">Add Todo </span>
            
          </button>
        </div>
      </div>
    </div>
  );
};
