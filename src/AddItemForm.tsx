import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";

type AddItemFormType = {
	addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormType> = React.memo((props) => {
	const [title, setTitle] = useState<string>("")
	const [error, setError] = useState<string | null>(null)

	const addItem = () => {
		if (title.trim()) {
			props.addItem(title)
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
			addItem()
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
			/>
			<IconButton color={ "primary" } size={ "large" } onClick={ addItem }>
				<AddBox fontSize={ "inherit" } />
			</IconButton>

		</div>
	)
})

export default AddItemForm