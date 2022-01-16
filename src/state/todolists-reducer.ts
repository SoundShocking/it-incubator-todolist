import { FilterValuesType, TodolistType } from '../App';
import { v4 as uuid } from 'uuid';

export type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST',
	id: string
}

export type AddTodolistActionType = {
	type: 'ADD-TODOLIST',
	title: string
	todolistId: string
}

type ChangeTodolistTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE',
	id: string
	title: string
}

type ChangeTodolistFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER',
	id: string
	filter: FilterValuesType
}

type ActionsType =
	RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType;

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id !== action.id)

		case 'ADD-TODOLIST':
			return [...state, { id: action.todolistId, title: action.title, filter: "all" }]

		case 'CHANGE-TODOLIST-TITLE': {
			return state.map(tl => {
				if (tl.id === action.id) {
					return {
						...tl,
						title: action.title
					}
				}
				return tl
			})
		}

		case 'CHANGE-TODOLIST-FILTER': {
			return state.map(tl => {
				if (tl.id === action.id) {
					return {
						...tl,
						filter: action.filter
					}
				}

				return tl
			})
		}

		default:
			return state
	}
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title: title, todolistId: uuid() }
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId }
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId }
}
