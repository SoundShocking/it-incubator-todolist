import React from 'react'
import { Provider } from "react-redux";
import { combineReducers, createStore } from 'redux'
import { tasksReducer } from "../../state/tasks-reducer";
import { todolistsReducer } from "../../state/todolists-reducer";
import { v4 as uuid } from 'uuid'

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer
})

type AppStateType = ReturnType<typeof rootReducer>

const initialGlobalState = {
	todolists: [
		{ id: "todolistId1", title: "What to learn", filter: "all" },
		{ id: "todolistId2", title: "What to buy", filter: "all" }
	],
	tasks: {
		["todolistId1"]: [
			{ id: uuid(), title: "HTML&CSS", isDone: true },
			{ id: uuid(), title: "JS", isDone: true }
		],
		["todolistId2"]: [
			{ id: uuid(), title: "Milk", isDone: true },
			{ id: uuid(), title: "React Book", isDone: true }
		]
	}
};

const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
	return <Provider store={ storyBookStore }>{ storyFn() }</Provider>
}