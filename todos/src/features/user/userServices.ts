import axios from "axios";
import { LoginRequest, UserRequest } from "../../types/user/user";

const API_URL = "https://todos-type.onrender.com/api/v1/user/";
const addUser = async (user: UserRequest) => {
  const response = await axios.post(API_URL, user);
  console.log("user about to add");
  console.log(response.data);
  console.log("user added");
  return response.data;
};

const loginUser = async (authModel: LoginRequest) => {
  console.log("user about to login");

  const response = await axios.post(API_URL + "login", authModel);
  console.log("user after login");
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

const fetchuser = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const updateUser = async (id: string, user: UserRequest) => {
  const response = await axios.put(API_URL + `${id}`, user);
  return response.data;
};

const deleteUser = async (id: string) => {
  const response = await axios.delete(API_URL + `${id}`);
  return response.data;
};
const logout = () => {
  localStorage.removeItem("user");
  console.log("user logged out");
};

const userService = {
  addUser,
  fetchuser,
  updateUser,
  deleteUser,
  loginUser,
  logout,
};

export default userService;
