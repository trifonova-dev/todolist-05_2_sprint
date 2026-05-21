import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type CreateItemFormType = {
    createItem: (itemTitle: string) => void
    maxTitleLength: number
}

export const CreateItemForm = ({createItem, maxTitleLength}: CreateItemFormType) => {
    const [itemInput, setItemInput] = useState("")
    const [error, setError] = useState(false)

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setItemInput(e.currentTarget.value)
    }

    const createItemHandler = () => {
        const trimmedTitle = itemInput.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle)
        } else {
            setError(true)
        }
        setItemInput("")
    }


    const isItemTitleValid = Boolean(itemInput.length) && itemInput.length <= maxTitleLength

    const onKeyDownCreateItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && isItemTitleValid) {
            createItemHandler()
        }
    }

    return (
        <div>
                <span>
                    <input
                        value={itemInput}
                        className={error ? "error" : ""}
                        onChange={setLocalTitleHandler}
                        onKeyDown={onKeyDownCreateItemHandler}
                    />
                    {itemInput.length}
                </span>
            <Button
                title="+"
                disabled={!isItemTitleValid}
                onClick={createItemHandler}/>

            {itemInput.length === 0 &&
                <div style={{color: error ? "red" : "inherit"}}>Enter title end press button</div>}
            {isItemTitleValid && <div>Max title length is {maxTitleLength} charters</div>}
            {itemInput.length > maxTitleLength && <div style={{color: "red"}}>Title length is too long</div>}
        </div>

    );
}

