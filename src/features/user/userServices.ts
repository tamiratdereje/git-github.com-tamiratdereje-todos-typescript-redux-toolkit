
import axios from "axios";
import User from "../../common/models/userModel";
import LoginModel from "../../common/models/loginModel";
const API_URL = "http://localhost:3001/user";
const addUser = async (user: User) => {
    const response = await axios.post(API_URL, user);
    return response.data;
    };
const loginUser = async (authModel: LoginModel) => {
    const response = await axios.post(API_URL, authModel);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
    };

const fetchuser = async () => {
    const response = await axios.get(API_URL);
    return response.data;
    };

const updateUser = async (id: string, user: User) => {
    const response = await axios.put(API_URL +  `${id}`, user);
    return response.data;
}

const deleteUser = async (id: string) => {
    const response = await axios.delete(API_URL + `${id}`);
    return response.data;
}
const logout = () => {
    localStorage.removeItem("user");
    };


const userService = {
    addUser,
    fetchuser,
    updateUser,
    deleteUser,
    loginUser,
    logout
};

export default userService;