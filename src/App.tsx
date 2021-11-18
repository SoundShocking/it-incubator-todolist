import React, { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';
import { TaskType, Todolist } from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
	id: string
	title: string
	filter: FilterValuesType
}

type TasksStateType = {
	[key: string]: TaskType[]
}

const App: FC = () => {
	const todolistId1 = uuid()
	const todolistId2 = uuid()

	const [todolists, setTodolists] = useState<TodoListType[]>([
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	])

	const [tasks, setTasks] = useState<TasksStateType>({
		[todolistId1]: [
			{ id: uuid(), title: 'HTML&CSS', isDone: true },
			{ id: uuid(), title: 'JS', isDone: true },
			{ id: uuid(), title: 'ReactJS', isDone: false },
			{ id: uuid(), title: 'Rest API', isDone: false },
			{ id: uuid(), title: 'GraphQL', isDone: false },
		],
		[todolistId2]: [
			{ id: uuid(), title: 'HTML&CSS', isDone: true },
			{ id: uuid(), title: 'JS', isDone: true },
			{ id: uuid(), title: 'ReactJS', isDone: false },
			{ id: uuid(), title: 'Rest API', isDone: false },
			{ id: uuid(), title: 'GraphQL', isDone: false },
		]
	})

	const removeTask = (id: string, todolistId: string) => {
		const todolistTasks = tasks[todolistId]
		tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
		setTasks({ ...tasks })
	}

	const addTask = (title: string, todolistId: string) => {
		const task = { id: uuid(), title, isDone: false }
		const todolistTasks = tasks[todolistId]
		tasks[todolistId] = [task, ...todolistTasks]
		setTasks({ ...tasks })
	}

	const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
		const todolistTasks = tasks[todolistId]
		const task = todolistTasks.find(task => task.id === id)

		if (task) {
			task.isDone = isDone
			setTasks({ ...tasks })
		}
	}

	const changeFilter = (value: FilterValuesType, todolistId: string) => {
		const todolist = todolists.find(tl => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}

	const removeTodolist = (id: string) => {
		setTodolists(todolists.filter(tl => tl.id !== id))

		delete tasks[id]

		setTasks({ ...tasks })
	}

	return (
		<div className="App">
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
					<Todolist
						id={ tl.id }
						key={ tl.id }
						title={ tl.title }
						tasks={ tasksForTodolist }
						removeTask={ removeTask }
						changeFilter={ changeFilter }
						addTask={ addTask }
						changeTaskStatus={ changeStatus }
						removeTodolist={ removeTodolist }
						filter={ tl.filter }
					/>
				)
			}) }
		</div>
	);
}

export default App;
