const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const modeLabel = document.getElementById("modeLabel");

const timerDisplay = document.getElementById("timer");
const startTimerBtn = document.getElementById("startTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");

// ---------------- TASK SYSTEM ----------------

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTask(taskText);
  taskInput.value = "";
});

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTaskBtn.click();
  }
});

function createTask(taskText) {
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
}

// Default example tasks
createTask("Finish physics assignment");
createTask("Study UX basics");

// ---------------- POMODORO TIMER ----------------

let timeLeft = 1500; // 25 minutes
let timerInterval = null;

let state = "idle"; // idle | running | paused
let mode = "work"; // work | break

const WORK_TIME = 1500;   // 25 min
const BREAK_TIME = 300;   // 5 min

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

      if (mode === "work") {
        mode = "break";
        timeLeft = BREAK_TIME;

        modeLabel.textContent = "Break time";
        modeLabel.classList.remove("work");
        modeLabel.classList.add("break");

      } else {
        mode = "work";
        timeLeft = WORK_TIME;

        modeLabel.textContent = "Focus time";
        modeLabel.classList.remove("break");
        modeLabel.classList.add("work");
      }

      state = "idle";
      startTimerBtn.textContent = "Start";
      startTimerBtn.style.backgroundColor = "#7c5cff";

      updateTimerDisplay();
    }
  }, 1000);
}

// ---------------- START / PAUSE / RESUME ----------------

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

// ---------------- RESET ----------------

resetTimerBtn.addEventListener("click", function () {

  clearInterval(timerInterval);

  state = "idle";
  mode = "work";
  timeLeft = WORK_TIME;

  modeLabel.textContent = "Focus time";
  modeLabel.classList.remove("break");
  modeLabel.classList.add("work");

  startTimerBtn.textContent = "Start";
  startTimerBtn.style.backgroundColor = "#7c5cff";

  updateTimerDisplay();
});

// ---------------- INITIAL STATE ----------------

modeLabel.textContent = "Focus time";
modeLabel.classList.add("work");

updateTimerDisplay();