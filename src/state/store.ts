import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer
})

export const store = createStore(rootReducer, composeWithDevTools())

export type AppStateType = ReturnType<typeof rootReducer>