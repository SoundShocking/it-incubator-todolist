import React from 'react'
import { Meta, ComponentMeta, Story, ComponentStory } from '@storybook/react';
import { action } from "@storybook/addon-actions";

import { Task } from '../Task'

export default {
	title: 'Todolist/Task',
	component: Task
} as ComponentMeta<typeof Task>

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove Button inside Task clicked')

const Template: ComponentStory<typeof Task> = (args) => <Task { ...args } />

const baseArgs = {
	changeTaskStatus: changeTaskStatusCallback,
	changeTaskTitle: changeTaskTitleCallback,
	removeTask: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
	...baseArgs,
	task: { id: '1', isDone: true, title: 'JS' },
	todolistId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
	...baseArgs,
	task: { id: '2', isDone: false, title: 'React' },
	todolistId: 'todolistId2'
}