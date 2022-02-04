import React, { FC, useCallback, useEffect } from "react";
import { FilterValuesType } from "../todolists-reducer";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import { Button, IconButton, Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task } from "./Task/Task";
import { TaskStatuses, TaskType } from "../../../api/todolists-api";
import { fetchTasksTC } from "../tasks-reducer";
import { useDispatch } from "react-redux";
import { RequestStatusType } from "../../../app/app-reducer";

type PropsType = {
	id: string
	title: string
	entityStatus: RequestStatusType
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	filter: FilterValuesType
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist: FC<PropsType> = React.memo((props) => {
	const addTask = useCallback((title: string) => {
		props.addTask(title, props.id)
	}, [props.addTask, props.id])

	const removeTodolist = () => props.removeTodolist(props.id)
	const changeTodolistTitle = useCallback(
		(title: string) => props.changeTodolistTitle(props.id, title),
		[props.id, props.changeTodolistTitle]
	)

	const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
	const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
	const onCompleteClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])

	const dispatch = useDispatch()

	useEffect(() => {
		const thunk = fetchTasksTC(props.id)
		dispatch(thunk)
	}, [])

	let tasksForTodolist = props.tasks

	if (props.filter === 'active') {
		tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
	}
	if (props.filter === 'completed') {
		tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
	}

	return (
		<>
			<h3>
				<EditableSpan value={ props.title } onChange={ changeTodolistTitle } />

				<IconButton onClick={ removeTodolist } disabled={ props.entityStatus === 'loading' }>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={ addTask } disabled={ props.entityStatus === 'loading' } />

			<div>
				{ tasksForTodolist.map(task => {
						return <Task task={ task } changeTaskStatus={ props.changeTaskStatus }
												 changeTaskTitle={ props.changeTaskTitle } removeTask={ props.removeTask } todolistId={ props.id }
												 key={ task.id }
						/>
					}
				) }
			</div>

			<Stack direction={ "row" } spacing={ 1 } sx={ { mt: 2 } }>
				<Button onClick={ onAllClickHandler }
								variant={ props.filter === 'all' ? 'contained' : 'text' }
				>
					All
				</Button>

				<Button onClick={ onActiveClickHandler }
								variant={ props.filter === 'active' ? 'contained' : 'text' }
								color={ "warning" }
				>
					Active
				</Button>

				<Button onClick={ onCompleteClickHandler }
								variant={ props.filter === 'completed' ? 'contained' : 'text' }
								color={ "success" }
				>
					Completed
				</Button>
			</Stack>
		</>
	)
})
