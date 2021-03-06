import { combineReducers } from 'redux';
import { tasksReducer } from '../features/TodolistsList/tasks-reducer';
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer';
import { appReducer } from "./app-reducer";
import { authReducer } from "../features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer
})

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export const store = configureStore({
	reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>