
import axios from "axios";
import Todo from "../../common/models/todoModel";
const API_URL = "https://todos-type.onrender.com/api/v1/todo/";
const user: any = JSON.parse(localStorage.getItem("user") as string);

const headers = {
    Authorization: `Bearer ${user.token}`,
    'Content-Type': 'application/json', // You might need to adjust this depending on your API's requirements
  };

  
const addTodo = async (todo: any) => {
    const response = await axios.post(API_URL, todo, {headers});
    return response.data;
    };
const fetchTodos = async () => {
    const response = await axios.get(API_URL, {headers});
    return response.data;
    };

const updateTodo = async (id: string, todo: Todo) => {
    const response = await axios.put(API_URL +  `${id}`, todo, {headers});
    return response.data;
}

const deleteTodo = async (id: string) => {
    const response = await axios.delete(API_URL + `${id}`,  {headers});
    return response.data;
}

const todoService = {
    addTodo,
    fetchTodos,
    updateTodo,
    deleteTodo
};

export default todoService;