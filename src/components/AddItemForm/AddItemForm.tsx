import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";

export type AddItemFormType = {
	addItem: (title: string) => void
	disabled?: boolean
}

const AddItemForm: FC<AddItemFormType> = React.memo(({ disabled, addItem }) => {
	const [title, setTitle] = useState<string>("")
	const [error, setError] = useState<string | null>(null)

	const addItemHandler = () => {
		if (title.trim()) {
			addItem(title)
			setTitle('')
		} else {
			setError('title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error) {
			setError(null)
		}

		if (e.key === "Enter") {
			addItemHandler()
		}
	}

	return (
		<div>
			<TextField value={ title }
								 onChange={ onChangeHandler }
								 onKeyPress={ onKeyPressHandler }
								 variant={ "outlined" }
								 error={ !!error }
								 label={ 'Title' }
								 helperText={ error }
								 disabled={ disabled }
			/>
			<IconButton color={ "primary" } size={ "large" } onClick={ addItemHandler } disabled={ disabled }>
				<AddBox fontSize={ "inherit" } />
			</IconButton>

		</div>
	)
})

export default AddItemForm