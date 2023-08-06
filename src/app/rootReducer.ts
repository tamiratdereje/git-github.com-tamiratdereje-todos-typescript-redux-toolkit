import {combineReducers} from '@reduxjs/toolkit';

import todosReducer from '../features/todos/todosSlice';
import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
    todos: todosReducer,
    user: userReducer
});

export default rootReducer;