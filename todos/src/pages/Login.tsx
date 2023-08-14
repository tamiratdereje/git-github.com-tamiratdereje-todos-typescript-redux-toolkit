import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../common/hooks/useTypedSelector";
import { Link, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { login } from "../features/user/userSlice";
import { reset } from "../features/user/userSlice";
import LoginModel from "../common/models/loginModel";

export const Login: FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, auth, isSuccess } = useAppSelector(
    (state) => state.user
  );
  useEffect(() => {
    console.log(auth);
    console.log(isSuccess);
    if (isSuccess) {
      navigate("/");
    } else if (error) {
      console.log("everything is not fine");
      console.log(error);
    }
    dispatch(reset());
  }, [isSuccess, navigate, error, dispatch, auth]);

  const { email, password } = formData;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password } as LoginModel));
  };
 
  
  return <div>
    
    <div className="flex flex-col flex-1 items-center bg-gray-900  justify-center min-h-screen py-2">
        <div className="flex flex-col justify-center w-full max-w-sm px-4 py-8 dark:bg-gray-800 shadow-lg rounded-lg">
            <div className="flex flex-col items-center  justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-primary-700 to-primary-800">
                <svg className="w-8 h-8 text-white" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.5 16C27.5 21.7467 22.7467 26.5 17 26.5C11.2533 26.5 6.5 21.7467 6.5 16C6.5 10.2533 11.2533 5.5 17 5.5C22.7467 5.5 27.5 10.2533 27.5 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M16 17.5V21.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M16 9.5V10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
            <h2 className="mb-6 text-xl font-semibold text-center text-gray-100">login</h2>
            <form onSubmit={onSubmit}>
                
                <div className="flex flex-col items-start justify-between w-full mb-4 space-x-3">
                    <label htmlFor="email" className="text-sm text-gray-100 ml-3">Email</label>
                    <input type="email" name="email" id="email" placeholder="rami@gmail.com" className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-0" onChange={onChange} required/>
                </div>
                <div className="flex flex-col items-start justify-between w-full mb-4 space-x-3">
                    <label htmlFor="password" className="text-sm ml-3 text-gray-100">Password</label>
                    <input type="password" name="password" id="password" placeholder="************" className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-0" onChange={onChange} required/>
                </div>
                
                  {loading ? <div>loading...</div> : <button type="submit" className="block w-full px-4 py-2 mt-6 text-sm font-semibold text-center text-white transition duration-200 ease-in bg-blue-600 rounded-lg hover:bg-blue-200 focus:outline-none focus:bg-primary-700">login</button> }
            </form>
            <hr className="w-full my-6 border-gray-300" />
            <p className="text-sm text-center text-gray-400">Already have an account? <Link to={'/register'}><a href="#" className="text-primary-600 hover:text-primary-100">Create account</a></Link></p>
        </div>
    </div>

  </div>;
};
