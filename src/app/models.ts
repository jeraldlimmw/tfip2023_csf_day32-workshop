export interface Todo {
    title: string
    name: string
    tasks: Task[]
}

export interface Task {
    task: string
    priority: number
    dueDate: string
}