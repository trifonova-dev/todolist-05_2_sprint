import {useState} from 'react'
import './App.css'
import {getFilterTasks} from './utilites/getFilteredTasks'
import {v1} from 'uuid'
import {TaskType, Todolist} from './Todolist'
import {CreateItemForm} from "./CreateItemForm.tsx";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todolistId: string]: TaskType[]
}

export function App() {
    // BLL

    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "active"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
            {id: v1(), title: "REDUX", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "MEAT", isDone: true},
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "LIVER", isDone: false},
            {id: v1(), title: "WATER", isDone: false},
        ]
    })

    const deleteTask = (taskId: TaskType["id"], todolistId: TodolistType["id"]) => {
        const todolistsTasks = tasks[todolistId]
        const filteredTasks = todolistsTasks.filter(t => t.id !== taskId)
        const nextTasksState = {...tasks}
        nextTasksState[todolistId] = filteredTasks
        setTasks(nextTasksState)

        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    const createTask = (title: TaskType["title"], todolistId: TodolistType["id"]) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const addedTasks = [...tasks[todolistId], newTask]
        // const nextTasksState = { ...tasks }
        // nextTasksState[todolistId] = addedTasks
        // setTasks(nextTasksState)
        //
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], newTask]
        })
    }
    const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => {
        // const todolistsTasks = tasks[todolistId]
        // const updatedTasks = todolistsTasks.map(t => t.id === taskId ? { ...t, isDone: isDone } : t)
        // const nextTasksState = { ...tasks }
        // nextTasksState[todolistId] = updatedTasks
        // setTasks(nextTasksState)
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        })
    }

    const changeTaskTitle = (title: TaskType["title"], taskId: TaskType["id"], todolistId: TodolistType["id"]) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)})
    }

    const changeTodolistFilter = (filter: FilterValuesType, todolistId: TodolistType["id"]) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }
    const deleteTodolist = (todolistId: TodolistType["id"]) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }

    const createTodolist = (title: TodolistType["title"]) => {
        const newTodoID = v1()
        const newTODO: TodolistType = {
            id: newTodoID,
            title: title,
            filter: "all",
        }
        setTodolists([...todolists, newTODO])
        setTasks({...tasks, [newTodoID]: []})
    }

    const changeTodolistTitle = (title: TodolistType["title"], todolistId: TodolistType["id"]) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))
    }


    // UI


    const todolistsComponents = todolists.map(tl => {
        const filteredTasks = getFilterTasks(tasks[tl.id], tl.filter)
        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={filteredTasks}
                filter={tl.filter}
                deleteTask={deleteTask}
                changeTodolistFilter={changeTodolistFilter}
                changeTaskStatus={changeTaskStatus}
                createTask={createTask}
                deleteTodolist={deleteTodolist}
                changeTodolistTitle={changeTodolistTitle}
                changeTaskTitle={changeTaskTitle}
            />
        )
    })

    return (
        <div className="app">
            <CreateItemForm
                createItem={createTodolist}
                maxTitleLength={12}/>
            {todolistsComponents}
        </div>
    )
}


