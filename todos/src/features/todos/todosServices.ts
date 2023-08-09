
import axios from "axios";
import Todo from "../../common/models/todoModel";
const API_URL = "https://todos-type.onrender.com/api/v1/todo/";
const user: any = "";



  
const addTodo = async (todo: any, headers:any) => {
    
    const response = await axios.post(API_URL, todo, {headers});
    return response.data;
    };
const fetchTodos = async (headers:any) => {
    console.log("user after")
    console.log(headers)
    console.log("user after")
    const response = await axios.get(API_URL, {headers});
    console.log(response.data)
    return response.data;
    };

const updateTodo = async (id: string, todo: Todo, headers:any) => {
    const response = await axios.put(API_URL +  `${id}`, todo, {headers});
    return response.data;
}

const deleteTodo = async (id: string, headers:any) => {
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