import React from "react";
import { Meta, ComponentMeta, Story, ComponentStory } from '@storybook/react';
import { action } from "@storybook/addon-actions";

import AddItemForm, { AddItemFormType } from "../AddItemForm";

export default {
	title: 'Todolist/AddItemForm',
	component: AddItemForm,
	argTypes: {
		onClick: {
			description: 'Button inside form clicked'
		}
	}
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm { ...args } />

export const AddItemFormExample = Template.bind({})
AddItemFormExample.args = {
	addItem: action('Button inside form clicked')
}