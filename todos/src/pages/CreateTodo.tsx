import React from "react";
import Datepicker from "tailwind-datepicker-react";
import {
  useAppSelector,
  useAppDispatch,
} from "../common/hooks/useTypedSelector";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addTodo, reset, updateTodo } from "../features/todos/todosSlice";
import Todo from "../common/models/todoModel";
import { useParams } from "react-router-dom";

const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-red-500",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2022-01-01"),
  language: "en",
};

export const CreateTodo = () => {
  const navigate = useNavigate();
  const { auth } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { loading, error, isSuccess, data } = useAppSelector(
    (state) => state.todos
  );
  const { id } = useParams();
  let todo: any = data.find((todo) => todo.id === id);
  console.log(todo);

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    description: "",
    category: "Personal",
    status: "Not Started",
    priority: "Low",
  });
  const [updateT, setUpdateT] = useState(false);
  const { description, category, status, priority } = formData;
  useEffect(() => {
    if (id && !updateT) {
      console.log("editing todo");
      if (todo) {
        console.log("todo found");
        setFormData({
          description: todo.description,
          category: todo.category,
          status: todo.status,
          priority: todo.priority,
        });
        setDate(new Date(todo.dueDate));
      }
    }
    if (!auth) {
      console.log("not authenticated");
      navigate("/login");
    }
    if (error) {
      console.log("error while creating todo");
      return () => {
        dispatch(reset());
      };
    }
    if (updateT) {
      console.log("todo updated successfully");
      dispatch(reset());    
      navigate(`/todos/${id}`);
      setUpdateT(false);
      return () => {
        dispatch(reset());
      };
    }
    if (isSuccess) {
      console.log("todo created successfully");
      navigate("/todos");
      return () => {
        dispatch(reset());
      };
    }
  }, [auth, navigate, error, dispatch, isSuccess, id, updateT]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = (selectedDate: Date) => {
    setDate(selectedDate);
    console.log(date);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting form");
    if (id) {
      setUpdateT(true);
      dispatch(
        updateTodo({
          id: id,
          description: description,
          category: category,
          status: status,
          priority: priority,
          dueDate: date.toUTCString(),
        } as Todo)
      );
    } else {
      dispatch(
        addTodo({
          description: description,
          category: category,
          status: status,
          priority: priority,
          dueDate: date.toUTCString(),
        } as Todo)
      );
    }
  };
  return (
    <div className="flex-1 justify-items-center bg-gray-900">
      <form
        className="w-1/2 bg-gray-900 m-5 justify-items-center mx-auto py-2"
        onSubmit={onSubmit}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="description"
            id="description"
            onChange={onChange}
            value={description}
            className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="lorem pasum"
            required
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            description
          </label>
        </div>

        <div className="grid md:grid-cols-2 w-full justify-items-stretch">
          <div className="relative z-0 w-1/2 mb-6 group">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select category
            </label>
            <select
              onChange={onChangeSelect}
              id="category"
              name="category"
              value={category}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Personal</option>
              <option>Work</option>
              <option>Shopping</option>
            </select>
          </div>

          <div className="relative z-0 w-1/2 mb-6 group">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select your status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={onChangeSelect}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-0 w-full items-stretch">
          <div className="relative z-0 w-1/2 mb-6 group">
            <label
              htmlFor="priority"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              select priority
            </label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={onChangeSelect}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="relative z-0 w-1/2 mb-6 group">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Set due date
              </label>
              <Datepicker
                options={options}
                onChange={handleChange}
                show={show}
                setShow={handleClose}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <div>
            (
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/2 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {id ? "Update" : "Submit"}
            </button>
            )
          </div>
        )}
      </form>
    </div>
  );
};
