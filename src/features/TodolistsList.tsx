import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../app/store";
import {
	addTodolistTC,
	changeTodolistFilterAC,
	changeTodolistTitleTC,
	fetchTodolistsTC,
	FilterValuesType,
	removeTodolistTC,
	TodolistDomainType
} from "./TodolistsList/todolists-reducer";
import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from "./TodolistsList/tasks-reducer";
import { TaskStatuses } from "../api/todolists-api";
import { Container, Grid, Paper } from "@mui/material";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import { Todolist } from "./TodolistsList/Todolist/Todolist";

export const TodolistsList: React.FC = () => {
	const todolists = useSelector<AppStateType, TodolistDomainType[]>(state => state.todolists)
	const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)
	const dispatch = useDispatch()

	useEffect(() => {
		const thunk = fetchTodolistsTC()
		dispatch(thunk)
	}, [dispatch])

	const removeTask = useCallback((id: string, todolistId: string) => {
		const thunk = removeTaskTC(id, todolistId)
		dispatch(thunk)
	}, [dispatch])

	const addTask = useCallback((title: string, todolistId: string) => {
		const thunk = addTaskTC(title, todolistId)
		dispatch(thunk)
	}, [dispatch])

	const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
		const thunk = updateTaskTC(id, { status }, todolistId)
		dispatch(thunk)
	}, [dispatch])

	const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
		const thunk = updateTaskTC(id, { title: newTitle }, todolistId)
		dispatch(thunk)
	}, [dispatch])

	const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
		dispatch(changeTodolistFilterAC(todolistId, value))
	}, [dispatch])

	const removeTodolist = useCallback((id: string) => {
		const thunk = removeTodolistTC(id)
		dispatch(thunk)
	}, [dispatch])

	const changeTodolistTitle = useCallback((id: string, title: string) => {
		const thunk = changeTodolistTitleTC(id, title)
		dispatch(thunk)
	}, [dispatch])

	const addTodolist = useCallback((title: string) => {
		const thunk = addTodolistTC(title)
		dispatch(thunk)
	}, [dispatch])

	return <>
		<Container sx={ { mt: 3 } }>
			<AddItemForm addItem={ addTodolist } />
		</Container>

		<Container sx={ { mt: 3, mb: 3 } }>
			<Grid container spacing={ 2 }>
				{ todolists.map(tl => {
					const tasksForTodolist = tasks[tl.id]

					return (
						<Grid item key={ tl.id } lg={ 4 }>
							<Paper style={ { padding: '15px' } }>
								<Todolist
									id={ tl.id }
									title={ tl.title }
									tasks={ tasksForTodolist }
									removeTask={ removeTask }
									changeFilter={ changeFilter }
									addTask={ addTask }
									changeTaskStatus={ changeStatus }
									changeTaskTitle={ changeTaskTitle }
									removeTodolist={ removeTodolist }
									filter={ tl.filter }
									changeTodolistTitle={ changeTodolistTitle }
								/>
							</Paper>
						</Grid>
					)
				}) }
			</Grid>
		</Container>
	</>
}