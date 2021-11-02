import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
	const [tasks, setTasks] = useState<TaskType[]>([
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'ReactJS', isDone: false },
		{ id: 4, title: 'Rest API', isDone: false },
		{ id: 5, title: 'GraphQL', isDone: false },
	])

	const [filter, setFilter] = useState<FilterValuesType>("all")

	const removeTask = (id: number) => {
		const filteredTasks = tasks.filter(task => task.id !== id)
		setTasks(filteredTasks)
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

	return (
		<div className="App">
			<Todolist title="What to learn" tasks={ tasksForTodolist } removeTask={ removeTask }
				changeFilter={ changeFilter }
			/>
		</div>
	);
}

export default App;
