import React, { ChangeEvent, FC } from "react";
import clsx from "clsx";
import { FilterValuesType } from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
		<div>
			<h3><EditableSpan value={ props.title } onChange={ changeTodolistTitle } />
				<button onClick={ removeTodolist }>x</button>
			</h3>
			<AddItemForm addItem={ addTask } />

			<ul>
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
							<li key={ task.id } className={ clsx({ 'is-done': task.isDone }) }>
								<input type="checkbox" checked={ task.isDone } onChange={ onChangeHandler } />
								<EditableSpan value={ task.title } onChange={ onTitleChangeHandler }
								/>
								<button onClick={ onClickHandler }>x</button>
							</li>
						)
					}
				) }
			</ul>

			<div>
				<button onClick={ onAllClickHandler } className={ clsx({ 'active-filter': props.filter === 'all' }) }
				>All
				</button>
				<button onClick={ onActiveClickHandler } className={ clsx({ 'active-filter': props.filter === 'active' }) }
				>Active
				</button>
				<button onClick={ onCompleteClickHandler }
								className={ clsx({ 'active-filter': props.filter === 'completed' }) }
				>Completed
				</button>
			</div>
		</div>
	)
}
