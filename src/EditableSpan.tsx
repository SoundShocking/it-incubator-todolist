import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
	value: string
	onChange: (newValue: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {
	const [editMode, setEditMode] = useState<boolean>(false)
	const [title, setTitle] = useState<string>(props.value)

	const activateEditMode = () => {
		setEditMode(true)
		setTitle(props.value)
	}
	const activateViewMode = (e: ChangeEvent<HTMLInputElement>) => {
		setEditMode(false)
		props.onChange(e.currentTarget.value)
	}
	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			props.onChange(title)
			setEditMode(false)
		}
	}

	return (
		editMode
			? <input value={ title }
							 onChange={ changeTitle }
							 autoFocus
							 onBlur={ activateViewMode }
							 onKeyPress={ onKeyPressHandler }
			/>
			: <span onDoubleClick={ activateEditMode }>{ props.value }</span>
	)
}

export default EditableSpan