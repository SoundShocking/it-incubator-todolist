import { v4 as uuid } from 'uuid'
import { TasksStateType } from "../App";
import { TaskType } from "../Todolist";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	todolistId: string
	taskId: string
}

type AddTaskActionType = {
	type: 'ADD-TASK'
	title: string
	todolistId: string
}

type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	taskId: string
	todolistId: string
	isDone: boolean
}

type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	taskId: string
	todolistId: string
	title: string
}

type ActionsType =
	RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
	switch (action.type) {
		case "REMOVE-TASK": {
			return {
				...state,
				[action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
			}
		}

		case "ADD-TASK": {
			const newTask: TaskType = {
				id: uuid(),
				title: action.title,
				isDone: false
			}

			return {
				...state,
				[action.todolistId]: [newTask, ...state[action.todolistId]]
			}
		}

		case "CHANGE-TASK-STATUS": {
			// return {
			// 	...state,
			// 	[action.todolistId]: state[action.todolistId].map(t =>
			// 		t.id === action.taskId
			// 			? { ...t, isDone: action.isDone }
			// 			: t
			// 	)
			// }
			let todolistTasks = state[action.todolistId];
			state[action.todolistId] = todolistTasks
				.map(t => t.id === action.taskId
					? {...t, isDone: action.isDone}
					: t);
			return ({...state});
		}

		case "CHANGE-TASK-TITLE": {
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map(t =>
					t.id === action.taskId
						? { ...t, title: action.title }
						: t
				)
			}
		}

		case "ADD-TODOLIST": {
			return {
				...state,
				[action.todolistId]: []
			}
		}

		case "REMOVE-TODOLIST": {
			// const newState: TasksStateType = {}
			// Object.entries(state)
			// 	.filter(([key, value]) => key !== action.id)
			// 	.forEach(([key, value]) => newState[key] = [...value])
			//
			// return newState
			return Object.fromEntries(
				Object.entries(state).filter(([key, value]) => key !== action.id)
			)
		}

		default:
			return state
	}
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
	return { type: 'REMOVE-TASK', todolistId, taskId }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
	return { type: 'ADD-TASK', title, todolistId }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
	return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId }
}