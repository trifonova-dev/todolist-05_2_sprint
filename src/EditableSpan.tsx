import {ChangeEvent, useState} from "react";

export type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
    className?: string
}
export const EditableSpan = ({title, changeTitle, className}: EditableSpanType) => {
        const [itemTitle, setItemTitle] = useState(title)
        const [editMode, setEditMode] = useState(false)

        const onEditMode = () => {
            console.log('double click!')
            setEditMode(true)
        }
        const offEditMode = () => {
            changeTitle(itemTitle)
            setEditMode(false)
        }

        const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setItemTitle(e.currentTarget.value)
        }
        return (
            editMode
                ? <input
                    autoFocus
                    value={itemTitle}
                    onChange={setLocalTitleHandler}
                    onBlur={offEditMode}
                />
                : <span
                    onClick={onEditMode}
                    className={className}
                >{itemTitle}</span>
        );
    }
;
