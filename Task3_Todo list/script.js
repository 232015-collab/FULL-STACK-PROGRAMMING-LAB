// ─── Fixed 3 tasks ────────────────────────────────────────────────────────────
const tasks = [
  { id: 1, name: "Read Chapter 1 of JavaScript textbook",  status: "pending" },
  { id: 2, name: "Complete Lab 02 assignments",             status: "pending" },
  { id: 3, name: "Push code to GitHub repository",          status: "pending" },
];

// ─── Update stats (completed / total) ────────────────────────────────────────
function updateStats() {
  const total     = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const removed   = tasks.filter(t => t.status === "removed").length;
  const active    = total - removed;

  document.getElementById("stat-total").textContent     = total;
  document.getElementById("stat-completed").textContent = completed;
  document.getElementById("stat-active").textContent    = active;
}

// ─── Mark task complete / undo ────────────────────────────────────────────────
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (!task || task.status === "removed") return;

  task.status = task.status === "done" ? "pending" : "done";
  renderTask(id);
  updateStats();
}

// ─── Remove task ──────────────────────────────────────────────────────────────
function removeTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task || task.status === "removed") return;

  const confirmed = confirm(`Remove task: "${task.name}"?`);
  if (!confirmed) return;

  task.status = "removed";
  renderTask(id);
  updateStats();
}

// ─── Style all tasks uniformly using a loop ───────────────────────────────────
function styleAllTasks() {
  tasks.forEach(task => {
    const card = document.getElementById(`card-${task.id}`);
    if (!card) return;
    card.style.borderColor = "#38bdf8";
    card.style.boxShadow   = "0 0 12px rgba(56,189,248,0.3)";
    card.style.transform   = "scale(1.01)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "";
    }, 600);
  });
  alert("✅ All tasks have been styled uniformly!");
}

// ─── Reset all tasks to pending ───────────────────────────────────────────────
function resetAll() {
  tasks.forEach(task => {
    task.status = "pending";
    renderTask(task.id);
  });
  updateStats();
}

// ─── Render / update a single task card ──────────────────────────────────────
function renderTask(id) {
  const task = tasks.find(t => t.id === id);
  const card = document.getElementById(`card-${id}`);
  if (!card) return;

  const isDone    = task.status === "done";
  const isRemoved = task.status === "removed";

  // Card class
  card.className = "task-card" +
    (isDone    ? " completed"    : "") +
    (isRemoved ? " removed-card" : "");

  // Number badge
  const numEl = card.querySelector(".task-number");
  numEl.textContent = isRemoved ? "✕" : isDone ? "✔" : id;

  // Input style
  const inputEl = card.querySelector(".task-input");
  inputEl.className = "task-input" + (isDone ? " completed-input" : "");
  inputEl.value = task.name;

  // Status badge
  const badge = card.querySelector(".status-badge");
  badge.className = "status-badge " + task.status;
  badge.textContent =
    task.status === "done"    ? "✔ Done"    :
    task.status === "removed" ? "✕ Removed" : "⏳ Pending";

  // Complete button text
  const completeBtn = card.querySelector(".btn-complete");
  completeBtn.textContent = isDone ? "↩ Undo" : "✔ Complete";
  completeBtn.className   = "btn-action btn-complete" + (isDone ? " done" : "");
}

// ─── Build initial task cards ──────────────────────────────────────────────────
function buildAllTasks() {
  const area = document.getElementById("task-area");
  area.innerHTML = "";

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card";
    card.id = `card-${task.id}`;

    card.innerHTML = `
      <div class="task-top">
        <div class="task-number">${task.id}</div>
        <input class="task-input" type="text" value="${task.name}"
               oninput="tasks.find(t=>t.id===${task.id}).name=this.value" />
        <span class="status-badge pending">⏳ Pending</span>
      </div>
      <div class="task-actions">
        <button class="btn-action btn-complete" onclick="toggleComplete(${task.id})">✔ Complete</button>
        <button class="btn-action btn-remove"   onclick="removeTask(${task.id})">🗑 Remove</button>
      </div>
    `;
    area.appendChild(card);
  });

  updateStats();
}

// ─── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", buildAllTasks);
