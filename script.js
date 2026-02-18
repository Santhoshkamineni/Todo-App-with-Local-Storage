const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.title}</span>
      <div class="actions">
        <button class="complete" data-index="${index}">✓</button>
        <button class="delete" data-index="${index}">✕</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const title = taskInput.value.trim();

  if (!title) return alert("Please enter a task");

  tasks.push({ title, completed: false });
  taskInput.value = "";

  saveTasks();
  renderTasks();
});

taskList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;

  if (e.target.classList.contains("complete")) {
    tasks[index].completed = !tasks[index].completed;
  }

  if (e.target.classList.contains("delete")) {
    tasks.splice(index, 1);
  }

  saveTasks();
  renderTasks();
});

renderTasks();
