import { v4 as uuidV4 } from 'uuid';

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLFormElement>("#newTaskTitle")
const tasks: Task[] = loadTasks()

tasks.forEach(addListItem)

// Defining type Task with the attributes to be used.
type Task = { 
  id: string, 
  title: string, 
  completed: boolean, 
  createdAt: Date
}


form?.addEventListener("submit", e => {

  e.preventDefault() // prevents refresh on page

  if (input?.value == "" || input?.value == null) return // the ? is optional chaining, if value doesnt exists it returns undefined

  const newTask: Task = { 
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask)
  saveTasks()
  

  addListItem(newTask)
  input.value = ""

})

// Function to add Task type to the todo list.
function addListItem(task: Task) {
  
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed

  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)

}

// Function to save task to local storage using JSON
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}


// Function to load task from local storage. Returns an empty array if nothing found in LS.
function loadTasks(): Task[] {
const taskJson = localStorage.getItem("TASKS")
if (taskJson == null) return []
  return JSON.parse(taskJson)
}