import {useState} from 'react'

import './App.css'

import {getFilterTasks} from './utilites/getFilteredTasks'
import {v1} from 'uuid'
import {TaskType, Todolist} from './Todolist'

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}


export function App() {
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "active"}

    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false},
            {id: v1(), title: "REDUX", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Chicken", isDone: false},
        ]
    })

    // BLL

    const deleteTask = (taskId: TaskType["id"], todolistId: TodolistType["id"]) => {
        // const todolistTasks = tasks[todolistId]
        // const filteredTasks = todolistTasks.filter(t => t.id !== taskId)
        // const nextStateTasks = {...tasks}
        // nextStateTasks[todolistId] = filteredTasks
        // setTasks(nextStateTasks)
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const createTask = (title: TaskType["title"], todolistId: TodolistType["id"]) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const addedTask = [...tasks[todolistId], newTask]
        // const nextTaskState = {...tasks}
        // nextTaskState[todolistId] = addedTask
        // setTasks(nextTaskState)
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => {
        // const todolistTasks = tasks[todolistId]
        // const updatedTasks = todolistTasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        // const nextTasksState = {...tasks}
        // nextTasksState[todolistId] = updatedTasks
        // setTasks(nextTasksState)
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    // UI
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: TodolistType["id"]) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const deleteTodolist = (todolistId: TodolistType["id"]) => {
        setTodolists(todolists.filter(tl => tl.id ! == todolistId))
    }

    const todolistComponent = todolists.map(tl => {
        const filteredTasks = getFilterTasks(tasks[tl.id], tl.filter)
        return (
            <Todolist
                key={tl.id}
                title={tl.title}
                filter={tl.filter}
                todolistId={tl.id}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeTodolistFilter={changeTodolistFilter}
                changeTaskStatus={changeTaskStatus}
                createTask={createTask}
                deleteTodolist={deleteTodolist}

            />
        )
    })

    return (
        <div className="app">
            {todolistComponent}
        </div>
    )
}


