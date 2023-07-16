class Task {
    constructor(public priority: number) {
    }
}

class TaskList {
    private tasks: Task[] = []
    
    public sortByPriority() {
        this.tasks = this.tasks.sort((a, b) => {
            if (a.priority > b.priority) {
                return 1
            } else if (a.priority == b.priority) {
                return 0
            } else {
                return -1
            }
        })
    }
    
    addTask(task: Task) {
        this.tasks.push(task)
    }
    
    getTask() {
        return this.tasks
    }
    
    count() {
        return this.tasks.length
    }
    
    public getIterator() {
        return new PriorityTaskIterator(this)
    }
}

interface IIterator<T> {
    current(): T | undefined
    next(): T | undefined
    prev(): T | undefined
    index(): number
}

class PriorityTaskIterator implements IIterator<Task> {
    private position: number = 0
    private taskList: TaskList
    
    constructor(taskList: TaskList) {
        taskList.sortByPriority()
        this.taskList = taskList
    }
    
    current(): Task | undefined {
        return this.taskList.getTask()[this.position]
    }
    
    next(): Task | undefined {
        this.position++
        return this.taskList.getTask()[this.position]
    }
    
    prev(): Task | undefined {
        this.position--
        return this.taskList.getTask()[this.position]
    }
    
    index(): number {
        return this.position
    }
}

const taskList = new TaskList()
taskList.addTask(new Task(8))
taskList.addTask(new Task(1))
taskList.addTask(new Task(3))
const iterator = taskList.getIterator()
console.log(iterator.current())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.prev())
console.log(iterator.index())
