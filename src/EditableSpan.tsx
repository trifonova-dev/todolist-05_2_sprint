import {ChangeEvent, useState} from "react";

export type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
    className?: string
}

export const EditableSpan = ({title, callBack, className}: EditableSpanType) => {
    const [itemTitle, setItemTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        callBack(itemTitle)
        setEditMode(false)
    }

    const onChangeItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                autoFocus
                value={itemTitle}
                onChange={onChangeItemTitle}
                onBlur={offEditMode}
            />
            : <span
                onClick={onEditMode}
                className={className}
            >{title}</span>
    );
};
