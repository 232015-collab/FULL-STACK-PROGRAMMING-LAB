// ─── History storage ──────────────────────────────────────────────────────────
const history = [];

// ─── Calculate result ─────────────────────────────────────────────────────────
function calculate(num1, num2, operation) {
  switch (operation) {
    case "+": return { result: num1 + num2, valid: true };
    case "-": return { result: num1 - num2, valid: true };
    case "*": return { result: num1 * num2, valid: true };
    case "/":
      if (num2 === 0) return { result: null, valid: false, error: "Division by zero is undefined!" };
      return { result: num1 / num2, valid: true };
    default:
      return { result: null, valid: false, error: "Unknown operation." };
  }
}

// ─── Display result in DOM ────────────────────────────────────────────────────
function displayResult(expression, value, isError, errorMsg) {
  const box = document.getElementById("result-box");
  box.style.display = "block";

  // Remove old classes
  box.className = "";

  if (isError) {
    box.classList.add("result-error");
    box.innerHTML = `
      <div class="result-label">⚠️ Error</div>
      <div class="result-expression">${expression}</div>
      <div class="result-value">!</div>
      <div class="result-badge">${errorMsg}</div>
    `;
    return;
  }

  // Determine class based on value sign (Bonus)
  let cls, badge;
  if (value > 0)      { cls = "result-positive"; badge = "▲ Positive"; }
  else if (value < 0) { cls = "result-negative"; badge = "▼ Negative"; }
  else                { cls = "result-zero";     badge = "◉ Zero";     }

  box.classList.add(cls);

  // Format result nicely
  const formatted = Number.isInteger(value) ? value : value.toFixed(4);

  box.innerHTML = `
    <div class="result-label">Result</div>
    <div class="result-expression">${expression}</div>
    <div class="result-value">${formatted}</div>
    <div class="result-badge">${badge}</div>
  `;
}

// ─── Add to history list ──────────────────────────────────────────────────────
function addToHistory(expression, result) {
  history.unshift({ expression, result });
  if (history.length > 5) history.pop(); // keep last 5

  const list = document.getElementById("history-list");
  list.innerHTML = "";
  history.forEach(h => {
    const li = document.createElement("li");
    li.textContent = `${h.expression} = ${h.result}`;
    list.appendChild(li);
  });

  document.getElementById("history-section").style.display = "block";
}

// ─── Main compute function (called on button click) ───────────────────────────
function compute() {
  const n1  = document.getElementById("num1").value.trim();
  const n2  = document.getElementById("num2").value.trim();
  const op  = document.getElementById("operation").value;

  // Validate inputs
  if (n1 === "" || n2 === "") {
    alert("⚠️ Please enter both numbers before calculating!");
    return;
  }

  const num1 = parseFloat(n1);
  const num2 = parseFloat(n2);

  if (isNaN(num1) || isNaN(num2)) {
    alert("⚠️ Please enter valid numbers!");
    return;
  }

  // Map operator symbol for display
  const opSymbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  const expression = `${num1} ${opSymbols[op]} ${num2}`;

  const { result, valid, error } = calculate(num1, num2, op);

  if (!valid) {
    displayResult(expression, null, true, error);
    return;
  }

  const formatted = Number.isInteger(result) ? result : result.toFixed(4);
  displayResult(expression + " =", result, false, "");
  addToHistory(expression, formatted);
}

// ─── Clear all ────────────────────────────────────────────────────────────────
function clearAll() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("operation").value = "+";
  document.getElementById("result-box").style.display = "none";
}

// ─── Allow Enter key to compute ───────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", e => {
    if (e.key === "Enter") compute();
  });
});
