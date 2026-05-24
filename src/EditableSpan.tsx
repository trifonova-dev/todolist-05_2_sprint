import {useState} from "react";
import {ChangeEvent} from "react";

export type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
    className?: string
}

export const EditableSpan = ({changeTitle, className, title}: EditableSpanType) => {
    const [itemTitle, setItemTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        changeTitle(itemTitle)
        setEditMode(false)
    }

    const itemInputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input
                autoFocus
                value={itemTitle}
                onChange={itemInputTitleHandler}
                onBlur={offEditMode}
            />
            : <span
                onClick={onEditMode}
                className={className}
            >
            {title}</span>
    );
};
