import {ChangeEvent, useState} from "react";

export type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = ({title, callBack}: EditableSpanType) => {
    const [itemTitle, setItemTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        callBack(itemTitle)
        setEditMode(false)
    }

    const onChangeTitleItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                autoFocus
                value={itemTitle}
                onChange={onChangeTitleItemHandler}
                onBlur={offEditMode}
            />
            : <span
                onClick={onEditMode}
            >{title}</span>
    );
};
