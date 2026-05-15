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

const todolistId_1 = v1()
const todolistId_2 = v1()

export function App() {


    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to by", filter: "active"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "REACT", isDone: true},
        ],
        [todolistId_2]: [
            {id: v1(), title: "MEAT", isDone: false},
            {id: v1(), title: "WATER", isDone: false},
            {id: v1(), title: "MILK", isDone: false},
        ]
    })

    // BLL

    const deleteTask = (taskId: TaskType["id"], todolistId: TodolistType["id"]) => {
        const todolistTasks = tasks[todolistId]
        const filteredTasks = todolistTasks.filter(t => t.id !== taskId)
        const copyTasks = {...tasks}
        copyTasks[todolistId] = filteredTasks
        setTasks(copyTasks)
    }


        const createTask = (title: TaskType["title"], todolistId: TodolistType["id"]) => {
            const newTask: TaskType = {
                id: v1(),
                title: title,
                isDone: false
            }
            // const addedTask = [...tasks[todolistId], newTask]
            // const nextStateTasks = {...tasks}
            // nextStateTasks[todolistId] = addedTask
            // setTasks(nextStateTasks)
            setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})

        }

        const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => {
            // const todolistTasks= tasks[todolistId]
            // const newStatusTasks = todolistTasks.map(t=>t.id !== taskId ? {...t, isDone:isDone}:t)
            // const copyStateTasks = {...tasks}
            // copyStateTasks[todolistId]= newStatusTasks
            setTasks({
                ...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id !== taskId ? {...t, isDone: isDone} : t)
            })
        }

        // UI

        const changeTodolistFilter = (filter: FilterValuesType, todolistId: TodolistType["id"]) => {
            setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
        }

        const deleteTodolist = (todolistId: TodolistType["id"]) => {
            setTodolists(todolists.filter(tl => tl.id !== todolistId))
        }

        const todolistsComponent = todolists.map(tl => {
            const filteredTasks = getFilterTasks(tasks[tl.id], tl.filter)
            return (
                <Todolist
                    key={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    changeTodolistFilter={changeTodolistFilter}
                    changeTaskStatus={changeTaskStatus}
                    createTask={createTask}
                    todolistId={tl.id}
                    deleteTodolist={deleteTodolist}
                />
            )
        })


        return (
            <div className="app">
                {todolistsComponent}
            </div>
        )
    }


