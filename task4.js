const courses = new Set();

courses.add("JavaScript");
courses.add("HTML");
courses.add("CSS");
courses.add("JavaScript"); // duplicate — Set ignores this

const container = document.getElementById("coursesContainer");
const icons = ["🟨", "🟧", "🟦", "🟩", "🟪", "🟥"];
let i = 0;
let output = "";

for (let course of courses) {
    output += `
    <div class="course-card">
        <div class="course-icon">${icons[i % icons.length]}</div>
        <h3>${course}</h3>
        <span class="course-tag">Registered</span>
    </div>`;
    i++;
}

container.innerHTML = output;

// Update count
document.getElementById("totalCourses").innerText = courses.size;