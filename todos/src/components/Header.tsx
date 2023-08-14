import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../common/hooks/useTypedSelector";
import { logout, reset } from "../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const auth: any = JSON.parse(localStorage.getItem("user") as string);
  console.log("auth----------------------")
  console.log(auth);
  console.log("auth----------------------")

  const logOut = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");

  };

  return (
    <div>
      <header>
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <span className="block pl-3 pr-4 rounded font-medium md:border-0 md:hover:text-blue-500 md:p-0 text-white px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:text-blue-500 ">
                Todo
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
              {auth && location.pathname === "/Profile" ? (
                <button
                  onClick={logOut}
                  className="block pl-3 pr-4 rounded md:border-0 md:hover:text-blue-500 md:p-0 text-white px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:text-blue-500"
                >
                  Log out
                </button>
              ) : (
                <></>
              )}

              {auth ? (
                <Link
                  to={"/Profile"}
                  className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 lg:border-0 lg:hover:text-primary-700 lg:p-0  hover:text-blue-500  "
                >
                  {auth.data.name}
                </Link>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className={`block pl-3 pr-4 rounded md:border-0 md:hover:text-blue-500 md:p-0 text-white px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:text-blue-500  ${
                      location.pathname === "/login" ? "text-white bg-primary-700 hover:bg-primary-800 ring-4 ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-primary-700 outline-none ring-primary-800" : ""
                    }`}
                  >
                    Log in
                  </Link>
                  <Link
                    to={"/register"}
                    className={`block pl-3 pr-4 rounded md:border-0 md:hover:text-blue-500 md:p-0 text-white px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:text-blue-500  ${
                      location.pathname === "/register" ? "text-white bg-primary-700 hover:bg-primary-800 ring-4 ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-primary-700 outline-none ring-primary-800" : ""
                    }`}
                  >
                    {" "}
                    Get started
                  </Link>
                </>
              )}

              <button
                auth-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200hover:bg-gray-700 "
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    className={`block py-2 pl-3 pr-4 rounded md:border-0 md:hover:text-blue-500 md:p-0 text-white  hover:text-blue-500 px-4 ${
                      location.pathname === "/" ? "text-white bg-primary-700 hover:bg-primary-800 ring-4 ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-primary-700 outline-none ring-primary-800" : ""
                    }`}
                    to={"/"}
                  >
                    DashBoard
                  </NavLink>
                </li>
                {auth ? (
                  
                  <li>
                    <NavLink
                      className={`block py-2 pl-3 pr-4 rounded md:border-0 md:hover:text-blue-500 md:p-0 text-white  hover:text-blue-500 px-4 ${
                        location.pathname === "/todos" ? "text-white bg-primary-700 hover:bg-primary-800 ring-4 ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-primary-700 outline-none ring-primary-800" : ""
                      }`}
                      to={"/todos"}
                    >
                      MyTo-Do
                    </NavLink>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
