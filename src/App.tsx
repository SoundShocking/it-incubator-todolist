import React, { FC } from 'react';
import { AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from "./state/store";

import './App.css';
import { TaskType, Todolist } from "./Todolist";
import AddItemForm from "./AddItemForm";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC
} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

const App: FC = () => {
	const todolists = useSelector<AppStateType, TodolistType[]>(state => state.todolists)
	const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)
	const dispatch = useDispatch()

	const removeTask = (id: string, todolistId: string) => {
		dispatch(removeTaskAC(id, todolistId))
	}

	const addTask = (title: string, todolistId: string) => {
		dispatch(addTaskAC(title, todolistId))
	}

	const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
		dispatch(changeTaskStatusAC(id, isDone, todolistId))
	}

	const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
		dispatch(changeTaskTitleAC(id, newTitle, todolistId))
	}

	const changeFilter = (value: FilterValuesType, todolistId: string) => {
		dispatch(changeTodolistFilterAC(todolistId, value))
	}

	const removeTodolist = (id: string) => {
		dispatch(removeTodolistAC(id))
	}

	const addTodolist = (title: string) => {
		dispatch(addTodolistAC(title))
	}

	const changeTodolistTitle = (id: string, title: string) => {
		dispatch(changeTodolistTitleAC(id, title))
	}

	return (
		<div className="App">
			<Box sx={ { flexGrow: 1 } }>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={ { mr: 2 } }
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
							News
						</Typography>
						<Button color="inherit">Login</Button>
					</Toolbar>
				</AppBar>
			</Box>

			<Container sx={ { mt: 3 } }>
				<AddItemForm addItem={ addTodolist } />
			</Container>

			<Container sx={ { mt: 3, mb: 3 } }>
				<Grid container spacing={ 2 }>
					{ todolists.map(tl => {
						const allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks;

						if (tl.filter === "active") {
							tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
						}

						if (tl.filter === "completed") {
							tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
						}

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
		</div>
	);
}

export default App;
