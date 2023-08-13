import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../common/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import userImage from '../assets/user.png';

export const Profile = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, auth, isSuccess } = useAppSelector(
    (state) => state.user
  );

  return (
    <div className="flex-1 items-start bg-gray-900 font-bold underline min-h-full">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto">
        <div className="flex justify-end px-4 pt-4">          
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userImage}
            alt={auth.name}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {auth.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {auth.email}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              // onClick={}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Delete account
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
