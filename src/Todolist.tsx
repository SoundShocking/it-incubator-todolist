import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import clsx from "clsx";
import { FilterValuesType } from "./App";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (id: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	filter: string
	removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
	const [title, setTitle] = useState<string>("")
	const [error, setError] = useState<string | null>(null)

	const addTask = () => {
		if (title.trim()) {
			props.addTask(title.trim(), props.id)
			setTitle("")
		} else {
			setError('Title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.key === "Enter") {
			addTask()
		}
	}

	const removeTodolist = () => props.removeTodolist(props.id)

	const onAllClickHandler = () => props.changeFilter("all", props.id)
	const onActiveClickHandler = () => props.changeFilter("active", props.id)
	const onCompleteClickHandler = () => props.changeFilter("completed", props.id)

	return (
		<div>
			<h3>{ props.title }
				<button onClick={ removeTodolist }>x</button>
			</h3>
			<div>
				<input value={ title } onChange={ onChangeHandler } onKeyPress={ onKeyPressHandler }
							 className={ clsx({ 'error': error }) }
				/>
				<button onClick={ () => addTask() }>+</button>

				{ error && <div className="error-message">{ error }</div> }
			</div>

			<ul>
				{ props.tasks.map(task => {
						const onClickHandler = () => props.removeTask(task.id, props.id)
						const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
							const newIsDoneValue = e.currentTarget.checked
							props.changeTaskStatus(task.id, newIsDoneValue, props.id)
						}

						return (
							<li key={ task.id } className={ clsx({ 'is-done': task.isDone }) }>
								<input type="checkbox" checked={ task.isDone } onChange={ onChangeHandler } />
								<span>{ task.title }</span>
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