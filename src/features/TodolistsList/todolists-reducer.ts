import { todolistsAPI, TodolistType } from "../../api/todolists-api";
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from "../../app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

const initialState: TodolistDomainType[] = []

const slice = createSlice({
	name: 'todolists',
	initialState,
	reducers: {
		removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id);
			if (index > -1) {
				state.splice(index, 1);
			}
		},
		addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
			state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
		},
		changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id);
			state[index].title = action.payload.title;
		},
		changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id);
			state[index].filter = action.payload.filter;
		},
		changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
			const index = state.findIndex(tl => tl.id === action.payload.id);
			state[index].entityStatus = action.payload.status;
		},
		setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
			return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
		}
	}
})

export const todolistsReducer = slice.reducer

// actions
export const {
	removeTodolistAC,
	addTodolistAC,
	changeTodolistTitleAC,
	changeTodolistFilterAC,
	changeTodolistEntityStatusAC,
	setTodolistsAC
} = slice.actions

// thunks
export const fetchTodolistsTC = () => {
	return (dispatch: Dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))
		todolistsAPI.getTodolists()
			.then((res) => {
				dispatch(setTodolistsAC({ todolists: res.data }))
				dispatch(setAppStatusAC({ status: 'succeeded' }))
			})
	}
}
export const removeTodolistTC = (todolistId: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))
		dispatch(changeTodolistEntityStatusAC({ id: todolistId, status: 'loading' }))
		todolistsAPI.deleteTodolist(todolistId)
			.then((res) => {
				dispatch(removeTodolistAC({ id: todolistId }))
				dispatch(setAppStatusAC({ status: 'succeeded' }))
			})
	}
}
export const addTodolistTC = (title: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))
		todolistsAPI.createTodolist(title)
			.then((res) => {
				if (res.data.resultCode === 0) {
					dispatch(addTodolistAC({ todolist: res.data.data.item }))
					dispatch(setAppStatusAC({ status: 'succeeded' }))
				} else {
					if (res.data.messages.length) {
						dispatch(setAppErrorAC({ error: res.data.messages[0] }))
					} else {
						dispatch(setAppErrorAC({ error: 'Some error occurred' }))
					}
					dispatch(setAppStatusAC({ status: 'failed' }))
					console.log('123')
				}
			})
	}
}
export const changeTodolistTitleTC = (id: string, title: string) => {
	return (dispatch: Dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))
		todolistsAPI.updateTodolist(id, title)
			.then((res) => {
				dispatch(changeTodolistTitleAC({ id, title }))
				dispatch(setAppStatusAC({ status: 'succeeded' }))
			})
	}
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}