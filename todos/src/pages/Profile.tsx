import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import userImage from '../assets/user.png';

export const Profile = () => {

  
  const curAuth = JSON.parse(localStorage.getItem("user") || "{}");


  return (
    <div className="flex-1 items-start bg-gray-900 font-bold underline min-h-full">
      <div className="w-full max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 mx-auto">
        <div className="flex justify-end px-4 pt-4">          
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userImage}
            alt={curAuth.data.name}
          />
          <h5 className="mb-1 text-xl font-medium text-white">
            {curAuth.data.name}
          </h5>
          <span className="text-sm text-gray-400">
            {curAuth.data.email}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button
              // onClick={}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center bg-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 hover:text-gray-700 focus:outline-none  text-white hover:border-gray-700 focus:ring-gray-700"
            >
              Delete account
            </button>
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center bg-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 hover:text-gray-700 focus:outline-none  text-white hover:border-gray-700 focus:ring-gray-700"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
