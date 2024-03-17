window.addEventListener("DOMContentLoaded", (event) => {
  
  const taskName = document.getElementById("task-name");
  const taskDescription = document.getElementById("task-description");
  const button = document.getElementById("add-todo");
  const tableBody = document.getElementById("table-body");
  const searchInput = document.getElementById("search-input");

  let taskArray = [];

  function addTodo() {
    if (taskName.value === "" || taskDescription.value === "") {
      alert("Please fill in both the task name and description!");
      return;
    }

    const newTask = {
      nameOfTask: taskName.value,
      taskDescription: taskDescription.value,
      priority: document.querySelector('input[name="priority"]:checked').value,
      dueDate: document.getElementById("due-date").value
    };

    taskArray.push(newTask);

    displayTodo();
    clearInputFields();
  }

  function deleteTodo(index) {
    taskArray.splice(index, 1);
    displayTodo();
  }

  function editTodo(index) {
    const newName = prompt("Enter new task name:", taskArray[index].nameOfTask);
    const newDescription = prompt("Enter new task description:", taskArray[index].taskDescription);

    if (newName !== null && newDescription !== null) {
      taskArray[index].nameOfTask = newName;
      taskArray[index].taskDescription = newDescription;
      displayTodo();
    }
  }

  function clearInputFields() {
    taskName.value = "";
    taskDescription.value = "";
    document.getElementById("due-date").value = "";
    document.querySelectorAll('input[name="priority"]').forEach((radio) => {
      radio.checked = false;
    });
  }

  function displayTodo() {
    tableBody.innerHTML = "";

    taskArray.forEach((task, index) => {
      const row = tableBody.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);

      cell1.textContent = task.nameOfTask;
      cell2.textContent = task.taskDescription;
      cell3.textContent = task.priority;
      cell4.textContent = task.dueDate;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteTodo(index));

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => editTodo(index));

      cell5.appendChild(editBtn);
      cell5.appendChild(deleteBtn);
    });
  }

  function searchTodo() {
    const searchText = searchInput.value.toLowerCase();
    const filteredTasks = taskArray.filter(task => 
      task.nameOfTask.toLowerCase().includes(searchText) ||
      task.taskDescription.toLowerCase().includes(searchText)
    );
    tableBody.innerHTML = "";
    filteredTasks.forEach(task => {
      const row = tableBody.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);

      cell1.textContent = task.nameOfTask;
      cell2.textContent = task.taskDescription;
      cell3.textContent = task.priority;
      cell4.textContent = task.dueDate;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => deleteTodo(taskArray.indexOf(task)));

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => editTodo(taskArray.indexOf(task)));

      cell5.appendChild(editBtn);
      cell5.appendChild(deleteBtn);
    });
  }

  button.addEventListener("click", addTodo);
  searchInput.addEventListener("input", searchTodo);
});
