import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../common/hooks/useTypedSelector";
import { Link, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { register } from "../features/user/userSlice";
import User from "../common/models/userModel";
import { reset } from "../features/user/userSlice";

export const Register: FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, auth, isSuccess } = useAppSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isSuccess || auth) {
      navigate("/login");
    } else if (error) {
        console.log("everything is fine");
      console.log(error);
    }
    dispatch(reset());
  }, [isSuccess, navigate, error, dispatch, auth]);

  const { name, email, password, passwordConfirmation } = formData;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      console.log("Passwords do not match");
      return;
    }

    dispatch(register({ name, email, password } as User));
  };

  if (loading) {
    return <div>loading...</div>;
  }
  return <div>
    
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen py-2 bg-gray-900">
        <div className="flex flex-col justify-center w-full max-w-sm px-4 py-8 bg-gray-800 shadow-lg rounded-lg">
            <div className="flex flex-col items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-primary-700 to-primary-800">
                <svg className="w-8 h-8 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.5 16C27.5 21.7467 22.7467 26.5 17 26.5C11.2533 26.5 6.5 21.7467 6.5 16C6.5 10.2533 11.2533 5.5 17 5.5C22.7467 5.5 27.5 10.2533 27.5 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M16 17.5V21.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M16 9.5V10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
            <h2 className="mb-6 text-xl font-semibold text-center text-gray-100">Register</h2>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col items-start justify-between w-full mb-4 space-x-3">
                    <label htmlFor="firstName" className="text-sm ml-3 text-gray-100">First name</label>
                    <input type="text" name="name" id="firstName" placeholder="John" className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-0" onChange={onChange} required/>
                </div>
                <div className="flex flex-col items-start justify-between w-full mb-4 space-x-3">
                    <label htmlFor="email" className="text-sm ml-3 text-gray-100">Email</label>
                    <input type="email" name="email" id="email" placeholder="rami@gmail.com" className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-0" onChange={onChange} required/>
                </div>
                <div className="flex flex-col items-start justify-between w-full mb-4 space-x-3">
                    <label htmlFor="password" className="text-sm ml-3 text-gray-100">Password</label>
                    <input type="password" name="password" id="password" placeholder="************" className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-0" onChange={onChange} required/>
                </div>
                <div className="flex flex-col items-start justify-between w-full mb-4 space-x-3">
                    <label htmlFor="passwordConfirmation" className="text-sm ml-3 text-gray-100">Confirm Password</label>
                    <input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="************" className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-0" onChange={onChange} required/>
                </div>
                <button type="submit" className="block w-full px-4 py-2 mt-6 text-sm font-semibold text-center text-white transition duration-200 ease-in bg-white-600 rounded-lg hover:bg-blue-200 focus:outline-none focus:bg-primary-700 bg-blue-600">Register</button>
            </form>
            <hr className="w-full my-6 border-gray-300" />
            <p className="text-sm text-center text-gray-400">Already have an account? <Link to={'/login'}><a href="#" className="text-primary-600 hover:text-primary-700">Sign in</a></Link></p>
        </div>
    </div>

  </div>;
};
