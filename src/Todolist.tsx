import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import clsx from "clsx";
import { FilterValuesType } from "./App";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (id: string) => void
	changeFilter: (value: FilterValuesType) => void
	addTask: (title: string) => void
	changeTaskStatus: (id: string, isDone: boolean) => void
	filter: string
}

export function Todolist(props: PropsType) {
	const [title, setTitle] = useState<string>("")
	const [error, setError] = useState<string | null>(null)

	const addTask = () => {
		if (title.trim()) {
			props.addTask(title.trim())
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

	const onAllClickHandler = () => props.changeFilter("all")
	const onActiveClickHandler = () => props.changeFilter("active")
	const onCompleteClickHandler = () => props.changeFilter("completed")

	return (
		<div>
			<h3>{ props.title }</h3>
			<div>
				<input value={ title } onChange={ onChangeHandler } onKeyPress={ onKeyPressHandler }
							 className={ clsx({ 'error': error }) }
				/>
				<button onClick={ () => addTask() }>+</button>

				{ error && <div className="error-message">{ error }</div> }
			</div>

			<ul>
				{ props.tasks.map(task => {
						const onClickHandler = () => props.removeTask(task.id)
						const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
							const newIsDoneValue = e.currentTarget.checked
							props.changeTaskStatus(task.id, newIsDoneValue)
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