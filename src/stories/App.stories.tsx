import React from 'react'
import { Meta, ComponentMeta, Story, ComponentStory } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { ReduxStoreProviderDecorator } from "./decorators/ReduxStoreProviderDecorator";

import App from '../App'

export default {
	title: 'Todolist/App',
	component: App,
	decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = (args) => <App />

export const AppExample = Template.bind({})