const tasksRemaining = []
let tasksDone = []

const addHtmlElements = (task) => {
    let str = ''
    for (const x of tasksRemaining){
        str += `<li class="task">${x}<button onclick="handleTaskDone(this)">Done</button></li>`
    }
    const el = document.querySelector('.tasks-todo')
    el.innerHTML = str;
    console.log(tasksRemaining) 
    
    task.value = ''
}

const renderDoneTasks = () => {
    let str = ''
    for (const x of tasksDone){
        str += `<li>${x}</li>`
    }
    const el = document.querySelector('.tasks-done')
    el.innerHTML = str
    console.log(`Done tasks: ${tasksDone}`)
}
function handleTaskDone(element) {
    const done_task_name = element.parentNode.childNodes[0].nodeValue
    tasksDone.push(done_task_name)

    const index = tasksRemaining.indexOf(done_task_name)
    tasksRemaining.splice(index, 1)
    console.log(`Task ${done_task_name} is done, it is at index ${index} in the array`)

    // Re-Render the array
    addHtmlElements(done_task_name)
    renderDoneTasks()
}

function handleAddTask() {
    const task = document.querySelector('#taskbox')
    if(task.value != ''){
        tasksRemaining.push(task.value)
    
        addHtmlElements(task)
    }
}
function handleClearTask() {
    tasksDone = []

    renderDoneTasks()
}
 