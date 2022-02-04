import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "redux-thunk";
import { tasksReducer } from '../features/TodolistsList/tasks-reducer';
import { todolistsReducer } from '../features/TodolistsList/todolists-reducer';
import { appReducer } from "./app-reducer";

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type AppStateType = ReturnType<typeof rootReducer>