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

export type TodolistTasksType = {
    [todolistId: string]: TaskType[]
}

const todolistId_1 = v1()
const todolistId_2 = v1()
const todolistId_3 = v1()


export function App() {

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "active"},
        {id: todolistId_3, title: "What to want", filter: "completed"},
    ])

    const [tasks, setTasks] = useState<TodolistTasksType>({
        [todolistId_1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        [todolistId_2]: [
            {id: v1(), title: "MEAT", isDone: true},
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "WATER", isDone: true},
        ],
        [todolistId_3]: [
            {id: v1(), title: "BIG SALARY", isDone: true},
            {id: v1(), title: "COMFORT WORK", isDone: true},
            {id: v1(), title: "COMFORT COLLEGES", isDone: true},
        ]
    })


    // BLL

    const deleteTask = (taskId: TaskType["id"], todolistId: TodolistType["id"]) => {
        // const todolistTasks = tasks[todolistId]
        // const filteredTasks = todolistTasks.filter(t => t.id !== taskId)
        // const copyState = {...tasks}
        // copyState[todolistId] = filteredTasks
        // setTasks(copyState)
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const createTask = (title: TaskType["title"], todolistId: TodolistType["id"]) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }
        // const todolistTasks = tasks[todolistId]
        // const addedTask = [...todolistTasks, newTask]
        // const copyState = {...tasks}
        // copyState[todolistId] = addedTask
        // setTasks(copyState)
        //
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => {
        // const todolistTasks = tasks[todolistId]
        // const updatedTasks = todolistTasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        // const copyState = {...tasks}
        // copyState[todolistId] = updatedTasks
        // setTasks(copyState)
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    }

    // UI
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: TodolistType["id"]) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const deleteTodolist = (todolistId: TodolistType["id"]) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }

    const componentTodolist = todolists.map(tl => {
        const filteredTasks = getFilterTasks(tasks[tl.id], tl.filter)
        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                filter={tl.filter}
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
            {componentTodolist}
        </div>
    )
}


