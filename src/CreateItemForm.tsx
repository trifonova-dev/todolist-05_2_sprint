import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type CreateItemFormType = {
    createItem: (title: string) => void
    maxTitleLength: number
}
export const CreateItemForm = ({createItem, maxTitleLength}: CreateItemFormType) => {
    const [itemInput, setItemInput] = useState("")
    const [error, setError] = useState(false)

    const createTaskHandler = () => {
        const trimmedTitle = itemInput.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle)
        } else {
            setError(true)
        }
        setItemInput("")
    }

    const isTaskTitleValid = Boolean(itemInput.length) && itemInput.length <= maxTitleLength
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setItemInput(e.currentTarget.value)
    }
    const onKeyDownCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey && isTaskTitleValid) {
            createTaskHandler()
        }
    }


    return (
        <div>
                <span>
                    <input
                        value={itemInput}
                        className={error ? "error" : ""}
                        onChange={setLocalTitleHandler}
                        onKeyDown={onKeyDownCreateTaskHandler}
                    />
                    {itemInput.length}
                </span>
            <Button
                title="+"
                disabled={!isTaskTitleValid}
                onClick={createTaskHandler}/>

            {itemInput.length === 0 &&
                <div style={{color: error ? "red" : "inherit"}}>Enter title end press button</div>}
            {isTaskTitleValid && <div>Max title length is {maxTitleLength} charters</div>}
            {itemInput.length > maxTitleLength && <div style={{color: "red"}}>Title length is too long</div>}
        </div>
    );
};
