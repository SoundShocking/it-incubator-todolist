import { ChangeEvent, FC } from "react";
import clsx from "clsx";
import { FilterValuesType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, Checkbox, IconButton, Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	filter: FilterValuesType
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist: FC<PropsType> = (props) => {
	const addTask = (title: string) => {
		props.addTask(title, props.id)
	}

	const removeTodolist = () => props.removeTodolist(props.id)
	const changeTodolistTitle = (title: string) => props.changeTodolistTitle(props.id, title)

	const onAllClickHandler = () => props.changeFilter("all", props.id)
	const onActiveClickHandler = () => props.changeFilter("active", props.id)
	const onCompleteClickHandler = () => props.changeFilter("completed", props.id)

	return (
		<>
			<h3><EditableSpan value={ props.title } onChange={ changeTodolistTitle } />
				<IconButton onClick={ removeTodolist }>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={ addTask } />

			<div>
				{ props.tasks.map(task => {
						const onClickHandler = () => props.removeTask(task.id, props.id)
						const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
							const newIsDoneValue = e.currentTarget.checked
							props.changeTaskStatus(task.id, newIsDoneValue, props.id)
						}
						const onTitleChangeHandler = (newValue: string) => {
							props.changeTaskTitle(task.id, newValue, props.id)
						}

						return (
							<div key={ task.id } className={ clsx({ 'is-done': task.isDone }) }>
								<Checkbox checked={ task.isDone } onChange={ onChangeHandler } />
								<EditableSpan value={ task.title } onChange={ onTitleChangeHandler }
								/>
								<IconButton onClick={ onClickHandler }>
									<Delete />
								</IconButton>
							</div>
						)
					}
				) }
			</div>

			<Stack direction={ "row" } spacing={ 1 } sx={ { mt: 2 } }>
				<Button onClick={ onAllClickHandler }
								variant={ props.filter === 'all' ? 'contained' : 'text' }
				>All
				</Button>
				<Button onClick={ onActiveClickHandler }
								variant={ props.filter === 'active' ? 'contained' : 'text' }
								color={ "warning" }
				>Active
				</Button>
				<Button onClick={ onCompleteClickHandler }
								variant={ props.filter === 'completed' ? 'contained' : 'text' }
								color={ "success" }
				>Completed
				</Button>
			</Stack>
		</>
	)
}
