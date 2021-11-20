import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import clsx from "clsx";

type AddItemFormType = {
	addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormType> = (props) => {
	const [title, setTitle] = useState<string>("")
	const [error, setError] = useState<string | null>(null)

	const addItem = () => {
		if (title.trim()) {
			props.addItem(title)
		} else {
			setError('title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)

		if (e.key === "Enter") {
			addItem()
			setTitle('')
		}
	}

	return (
		<div>
			<input value={ title }
						 onChange={ onChangeHandler }
						 onKeyPress={ onKeyPressHandler }
						 className={ clsx({ 'error': error }) }
			/>
			<button onClick={ addItem }>+</button>

			{ error && <div className="error-message">{ error }</div> }
		</div>
	)
}

export default AddItemForm