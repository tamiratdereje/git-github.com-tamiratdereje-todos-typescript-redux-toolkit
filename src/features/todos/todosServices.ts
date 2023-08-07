
import axios from "axios";
import Todo from "../../common/models/todoModel";
const API_URL = "http://localhost:3001/todos";
const addTodo = async (todo: any) => {
    const response = await axios.post(API_URL, todo);
    return response.data;
    };
const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
    };

const updateTodo = async (id: string, todo: Todo) => {
    const response = await axios.put(API_URL +  `${id}`, todo);
    return response.data;
}

const deleteTodo = async (id: string) => {
    const response = await axios.delete(API_URL + `${id}`);
    return response.data;
}

const todoService = {
    addTodo,
    fetchTodos,
    updateTodo,
    deleteTodo
};

export default todoService;