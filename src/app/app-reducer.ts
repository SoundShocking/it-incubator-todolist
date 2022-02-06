import { Dispatch } from "redux";
import { authAPI } from "../api/todolists-api";
import { setIsLoggedInAC } from "../features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateType = {
	status: 'idle',
	error: null,
	isInitialized: false
}

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
			state.status = action.payload.status
		},
		setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error
		},
		setAppInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
			state.isInitialized = action.payload.isInitialized
		}
	}
})

export const appReducer = slice.reducer

// actions
export const { setAppStatusAC, setAppErrorAC, setAppInitializedAC } = slice.actions

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
	authAPI.me().then(res => {
		if (res.data.resultCode === 0) {
			dispatch(setIsLoggedInAC(true));
		} else {

		}

		dispatch(setAppInitializedAC({ isInitialized: true }));
	})
}

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
	status: RequestStatusType
	error: string | null
	isInitialized: boolean
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>