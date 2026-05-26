import {ChangeEvent, useState} from "react";

export type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
    className?: string
}

export const EditableSpan = ({title, changeTitle, className}: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState(title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        changeTitle(itemTitle)
        setEditMode(false)
    }

    const onChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                autoFocus
                value={itemTitle}
                onChange={onChangeItemTitleHandler}
                onBlur={offEditMode}
            />
            : <span
                onClick={onEditMode}
                className={className}
            >{title}</span>
    );
};
