// ─── BOM info (Bonus) ──────────────────────────────────────────────────────────
function loadBOMInfo() {
  document.getElementById("bom-width").textContent   = window.screen.width + "px";
  document.getElementById("bom-height").textContent  = window.screen.height + "px";
  document.getElementById("bom-win-w").textContent   = window.innerWidth  + "px";
  document.getElementById("bom-win-h").textContent   = window.innerHeight + "px";
  document.getElementById("bom-browser").textContent = navigator.appName;
  document.getElementById("bom-lang").textContent    = navigator.language;
}

// ─── Sync color picker → text input ───────────────────────────────────────────
function syncPickerToText(slot) {
  const picker = document.getElementById(`picker${slot}`);
  const text   = document.getElementById(`color${slot}`);
  text.value   = picker.value;
}

// ─── Sync text input → color picker ───────────────────────────────────────────
function syncTextToPicker(slot) {
  const text   = document.getElementById(`color${slot}`);
  const picker = document.getElementById(`picker${slot}`);
  const val    = text.value.trim();
  // Only update picker if valid CSS color format
  if (/^#[0-9A-Fa-f]{3,6}$/.test(val) || CSS.supports("color", val)) {
    picker.value = val.startsWith("#") ? val : rgbToHex(val);
  }
}

// ─── Helper: resolve any color string to hex for picker ───────────────────────
function rgbToHex(colorStr) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = colorStr;
    ctx.fillRect(0,0,1,1);
    const d = ctx.getImageData(0,0,1,1).data;
    return "#" + [d[0],d[1],d[2]].map(v => v.toString(16).padStart(2,"0")).join("");
  } catch { return "#000000"; }
}

// ─── Handle a single color slot's Add logic ───────────────────────────────────
function handleColorSlot(slot) {
  const text  = document.getElementById(`color${slot}`).value.trim();
  if (!text) return null;

  // Validate color
  if (!CSS.supports("color", text)) {
    alert(`⚠️ Slot ${slot}: "${text}" is not a valid CSS color!\nTry a color name (red, blue) or hex (#ff0000).`);
    return null;
  }
  return text;
}

// ─── Add all 3 color boxes ────────────────────────────────────────────────────
function addColorBoxes() {
  let added = 0;
  for (let slot = 1; slot <= 3; slot++) {
    const color = handleColorSlot(slot);
    if (!color) continue;
    createBox(color);
    added++;
  }
  if (added === 0) {
    alert("⚠️ Please enter at least one color before clicking Add!");
  }
  updateEmptyMsg();
}

// ─── Create a color div box ───────────────────────────────────────────────────
function createBox(color) {
  const area = document.getElementById("boxes-area");

  const box = document.createElement("div");
  box.className  = "color-box";
  box.style.backgroundColor = color;

  // Label showing color name
  const label = document.createElement("div");
  label.className   = "box-label";
  label.textContent = color;

  // Remove button (appears on hover via CSS)
  const removeBtn = document.createElement("button");
  removeBtn.className   = "box-remove";
  removeBtn.textContent = "✕";
  removeBtn.title       = "Remove this box";
  removeBtn.onclick     = (e) => {
    e.stopPropagation();
    box.style.transform = "scale(0)";
    box.style.opacity   = "0";
    box.style.transition = "all 0.3s ease";
    setTimeout(() => { box.remove(); updateEmptyMsg(); }, 300);
  };

  box.appendChild(removeBtn);
  box.appendChild(label);
  area.appendChild(box);
}

// ─── Clear all boxes ──────────────────────────────────────────────────────────
function clearAllBoxes() {
  const area = document.getElementById("boxes-area");
  area.innerHTML = "";
  updateEmptyMsg();

  // Also clear inputs
  for (let slot = 1; slot <= 3; slot++) {
    document.getElementById(`color${slot}`).value  = "";
    document.getElementById(`picker${slot}`).value = "#000000";
  }
}

// ─── Show/hide empty message ──────────────────────────────────────────────────
function updateEmptyMsg() {
  const area  = document.getElementById("boxes-area");
  const boxes = area.querySelectorAll(".color-box");
  let   msg   = document.getElementById("empty-msg");

  if (boxes.length === 0) {
    if (!msg) {
      msg = document.createElement("p");
      msg.id        = "empty-msg";
      msg.className = "empty-msg";
      msg.textContent = "No color boxes yet. Enter colors above and click Add!";
      area.appendChild(msg);
    }
  } else {
    if (msg) msg.remove();
  }
}

// ─── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  loadBOMInfo();
  updateEmptyMsg();
});
