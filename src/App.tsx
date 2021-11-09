import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import { TaskType, Todolist } from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
	const [tasks, setTasks] = useState<TaskType[]>([
		{ id: uuid(), title: 'HTML&CSS', isDone: true },
		{ id: uuid(), title: 'JS', isDone: true },
		{ id: uuid(), title: 'ReactJS', isDone: false },
		{ id: uuid(), title: 'Rest API', isDone: false },
		{ id: uuid(), title: 'GraphQL', isDone: false },
	])

	const [filter, setFilter] = useState<FilterValuesType>("all")

	const removeTask = (id: string) => {
		const filteredTasks = tasks.filter(task => task.id !== id)
		setTasks(filteredTasks)
	}

	const addTask = (title: string) => {
		const task = { id: uuid(), title, isDone: false }
		setTasks([task, ...tasks])
	}

	let tasksForTodolist = tasks;

	if (filter === "active") {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}

	if (filter === "completed") {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}

	const changeFilter = (value: FilterValuesType) => {
		setFilter(value)
	}

	const changeStatus = (id: string, isDone: boolean) => {
		const task = tasks.find(task => task.id === id)

		if (task) {
			task.isDone = isDone
			setTasks([...tasks])
		}
	}

	return (
		<div className="App">
			<Todolist title="What to learn" tasks={ tasksForTodolist } removeTask={ removeTask }
				changeFilter={ changeFilter } addTask={ addTask } changeTaskStatus={ changeStatus } filter={ filter }
			/>
		</div>
	);
}

export default App;
