import React from 'react';
import './App.css';
import { TaskType, Todolist } from "./Todolist";

function App() {
	const tasks1: Array<TaskType> = [
		{ id: 1, title: 'Naruto', isDone: false },
		{ id: 2, title: 'The Vampire Diaries', isDone: false },
		{ id: 3, title: 'Sex Education', isDone: false },
	];

	return (
		<div className="App">
			<Todolist title="Watch" tasks={tasks1}/>
		</div>
	);
}

export default App;
