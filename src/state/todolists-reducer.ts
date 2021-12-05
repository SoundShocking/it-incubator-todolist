import { FilterValuesType, TodolistType } from '../App';
import { v4 } from 'uuid';

type RemoveTodolistActionType = {
	type: 'REMOVE-TODOLIST',
	id: string
}

type AddTodolistActionType = {
	type: 'ADD-TODOLIST',
	title: string
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

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter(tl => tl.id != action.id)

		case 'ADD-TODOLIST':
			return [...state, { id: v4(), title: action.title, filter: "all" }]

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
			throw new Error("I don't understand this type")
	}
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
	return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
	return { type: 'ADD-TODOLIST', title: title }
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
	return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId }
}

export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
	return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId }
}
