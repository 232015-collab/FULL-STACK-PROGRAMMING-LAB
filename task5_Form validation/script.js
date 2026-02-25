// ─── Individual field validators (each returns {valid, msg}) ─────────────────
function validateName(value) {
  if (!value.trim())          return { valid: false, msg: "❌ Name cannot be empty." };
  if (value.trim().length < 2) return { valid: false, msg: "❌ Name must be at least 2 characters." };
  return { valid: true, msg: "✔ Name looks good!" };
}

function validateEmail(value) {
  if (!value.trim())          return { valid: false, msg: "❌ Email cannot be empty." };
  if (!value.includes("@"))  return { valid: false, msg: "❌ Email must contain '@'." };
  const parts = value.split("@");
  if (parts[1] && !parts[1].includes(".")) return { valid: false, msg: "❌ Email domain seems invalid." };
  return { valid: true, msg: "✔ Valid email address!" };
}

function validateAge(value) {
  if (value === "")            return { valid: false, msg: "❌ Age cannot be empty." };
  const age = parseInt(value, 10);
  if (isNaN(age))              return { valid: false, msg: "❌ Please enter a valid number." };
  if (age < 18)                return { valid: false, msg: "❌ Age must be at least 18." };
  if (age > 60)                return { valid: false, msg: "❌ Age must be 60 or below." };
  return { valid: true, msg: "✔ Age is within the valid range (18–60)!" };
}

function validatePassword(value) {
  if (!value)              return { valid: false, msg: "❌ Password cannot be empty." };
  if (value.length < 6)   return { valid: false, msg: "❌ Password must be at least 6 characters." };
  return { valid: true, msg: "✔ Password length is sufficient!" };
}

// ─── Get password strength (0–4) ─────────────────────────────────────────────
function getPasswordStrength(value) {
  let score = 0;
  if (value.length >= 6)   score++;
  if (value.length >= 10)  score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9!@#$%^&*]/.test(value)) score++;
  return score;
}

// ─── Show inline error/success message ───────────────────────────────────────
function showMsg(id, text, isValid) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className   = "error-msg " + (isValid ? "show-success" : "show-error");
}

// ─── Set input state (valid / invalid / neutral) ──────────────────────────────
function setInputState(inputId, state) {
  const el = document.getElementById(inputId);
  el.classList.remove("valid", "invalid");
  if (state === "valid")   el.classList.add("valid");
  if (state === "invalid") el.classList.add("invalid");
}

// ─── Live validation on each field ───────────────────────────────────────────
function onNameChange() {
  const val = document.getElementById("name").value;
  const { valid, msg } = validateName(val);
  setInputState("name", val ? (valid ? "valid" : "invalid") : "");
  showMsg("name-msg", val ? msg : "", valid);
}

function onEmailChange() {
  const val = document.getElementById("email").value;
  const { valid, msg } = validateEmail(val);
  setInputState("email", val ? (valid ? "valid" : "invalid") : "");
  showMsg("email-msg", val ? msg : "", valid);
}

function onAgeChange() {
  const val = document.getElementById("age").value;
  const { valid, msg } = validateAge(val);
  setInputState("age", val ? (valid ? "valid" : "invalid") : "");
  showMsg("age-msg", val ? msg : "", valid);
}

function onPasswordChange() {
  const val = document.getElementById("password").value;
  const { valid, msg } = validatePassword(val);
  setInputState("password", val ? (valid ? "valid" : "invalid") : "");
  showMsg("password-msg", val ? msg : "", valid);

  // Update strength bar
  const strength = getPasswordStrength(val);
  const bar      = document.getElementById("strength-bar");
  const colors   = ["#f85149", "#f0883e", "#d29922", "#3fb950", "#3fb950"];
  bar.style.width      = (val ? (strength / 4) * 100 : 0) + "%";
  bar.style.background = colors[strength];
}

// ─── Submit handler ───────────────────────────────────────────────────────────
function handleSubmit() {
  const name  = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age   = document.getElementById("age").value;
  const pass  = document.getElementById("password").value;

  const checks = [
    validateName(name),
    validateEmail(email),
    validateAge(age),
    validatePassword(pass)
  ];

  // Trigger live validation display for all fields
  onNameChange(); onEmailChange(); onAgeChange(); onPasswordChange();

  const allValid = checks.every(c => c.valid);

  if (!allValid) {
    // Highlight first invalid field
    const fields = ["name","email","age","password"];
    const firstBad = fields[checks.findIndex(c => !c.valid)];
    document.getElementById(firstBad).focus();
    alert("⚠️ Please fix the highlighted errors before submitting.");
    return;
  }

  // Confirm submission (using confirm() as required)
  const confirmed = confirm(`✅ Ready to submit!\n\nName: ${name}\nEmail: ${email}\nAge: ${age}\n\nProceed with registration?`);
  if (!confirmed) return;

  // Show success box
  document.getElementById("success-name").textContent = name;
  document.getElementById("success-box").style.display = "block";
  document.getElementById("success-box").scrollIntoView({ behavior: "smooth" });

  // Bonus: alert after a short delay
  setTimeout(() => {
    alert(`🎉 Welcome, ${name}! Your account has been successfully created.\n\nA confirmation email will be sent to: ${email}`);
  }, 600);
}

// ─── Reset form ───────────────────────────────────────────────────────────────
function resetForm() {
  ["name","email","age","password"].forEach(id => {
    document.getElementById(id).value = "";
    setInputState(id, "");
    const msgId = id + "-msg";
    const msgEl = document.getElementById(msgId);
    if (msgEl) { msgEl.textContent = ""; msgEl.className = "error-msg"; }
  });
  const bar = document.getElementById("strength-bar");
  bar.style.width = "0%";
  document.getElementById("success-box").style.display = "none";
}
