const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const resetTimerBtn = document.getElementById("resetTimerBtn");

addTaskBtn.addEventListener("click", function () {
    

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const newTask = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  const buttonContainer = document.createElement("div");

  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(deleteBtn);

  newTask.appendChild(taskSpan);
  newTask.appendChild(buttonContainer);

  taskList.appendChild(newTask);

  taskInput.value = "";

  completeBtn.addEventListener("click", function () {

  newTask.classList.toggle("completed");

  if (newTask.classList.contains("completed")) {
    completeBtn.style.backgroundColor = "#22c55e";
    completeBtn.textContent = "Completed";
  } else {
    completeBtn.style.backgroundColor = "#7c5cff";
    completeBtn.textContent = "Complete";
  }

});

  deleteBtn.addEventListener("click", function () {
    newTask.remove();
  });

});

taskInput.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {
    addTaskBtn.click();
  }

});
const timerDisplay = document.getElementById("timer");
const startTimerBtn = document.getElementById("startTimerBtn");

let timeLeft = 1500;
let timerInterval = null;

// states: "idle" | "running" | "paused"
let state = "idle";

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startCountdown() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      state = "idle";
      timeLeft = 1500;
      startTimerBtn.textContent = "Start";
      startTimerBtn.style.backgroundColor = "#7c5cff";
      timerDisplay.textContent = "Done!";
    }
  }, 1000);
}

startTimerBtn.addEventListener("click", function () {

  if (state === "idle") {
    state = "running";
    startTimerBtn.textContent = "Pause";
    startTimerBtn.style.backgroundColor = "#22c55e";
    startCountdown();
  }

  else if (state === "running") {
    clearInterval(timerInterval);
    state = "paused";
    startTimerBtn.textContent = "Resume";
    startTimerBtn.style.backgroundColor = "#f59e0b";
  }

  else if (state === "paused") {
    state = "running";
    startTimerBtn.textContent = "Pause";
    startTimerBtn.style.backgroundColor = "#22c55e";
    startCountdown();
  }

});

updateTimerDisplay();

resetTimerBtn.addEventListener("click", function () {

  // stop any running interval
  clearInterval(timerInterval);

  // reset state
  state = "idle";

  // reset time
  timeLeft = 1500;

  // reset UI
  updateTimerDisplay();

  startTimerBtn.textContent = "Start";
  startTimerBtn.style.backgroundColor = "#7c5cff";

});