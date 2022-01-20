import React, { ChangeEvent, useCallback } from 'react'
import { TaskType } from "./Todolist";
import clsx from "clsx";
import { Checkbox, IconButton } from "@mui/material";
import EditableSpan from "./EditableSpan";
import { Delete } from "@mui/icons-material";

type PropsType = {
	task: TaskType
	todolistId: string
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
	removeTask: (taskId: string, todolistId: string) => void
}

export const Task = React.memo((props: PropsType) => {
	const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const newIsDoneValue = e.currentTarget.checked
		props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
	}

	const onTitleChangeHandler = useCallback((newValue: string) => {
		props.changeTaskTitle(props.task.id, newValue, props.todolistId)
	}, [props.task, props.changeTaskTitle, props.todolistId])

	return (
		<div className={ clsx({ 'is-done': props.task.isDone }) }>
			<Checkbox checked={ props.task.isDone } onChange={ onChangeHandler } />

			<EditableSpan value={ props.task.title } onChange={ onTitleChangeHandler } />

			<IconButton onClick={ onClickHandler }>
				<Delete />
			</IconButton>
		</div>
	)
})