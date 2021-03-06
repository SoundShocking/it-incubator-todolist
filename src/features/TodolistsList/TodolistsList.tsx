import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../app/store";
import {
	addTodolistTC,
	changeTodolistFilterAC,
	changeTodolistTitleTC,
	fetchTodolistsTC,
	FilterValuesType,
	removeTodolistTC,
	TodolistDomainType
} from "./todolists-reducer";
import { addTaskTC, removeTaskTC, TasksStateType, updateTaskTC } from "./tasks-reducer";
import { TaskStatuses } from "../../api/todolists-api";
import { Container, Grid, Paper } from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";

export const TodolistsList: React.FC = () => {
	const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
	const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
	const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

	const dispatch = useDispatch()

	useEffect(() => {
		if (!isLoggedIn) return

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
		dispatch(changeTodolistFilterAC({ id: todolistId, filter: value }))
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

	if (!isLoggedIn) {
		return <Navigate to={ "/login" } />
	}

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
									entityStatus={ tl.entityStatus }
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