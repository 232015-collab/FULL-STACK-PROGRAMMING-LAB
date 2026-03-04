const students = [
    { name: "Ali", age: 22, semester: 5, courses: ["JS", "HTML"] },
    { name: "Sara", age: 21, semester: 4, courses: ["CSS", "React"] },
    { name: "Ahmed", age: 23, semester: 6, courses: ["Node", "MongoDB"] }
];

// Convert to JSON string
const jsonData = JSON.stringify(students, null, 2);

// Display raw JSON
document.getElementById("jsonBox").textContent = jsonData;

// Convert back
const parsedData = JSON.parse(jsonData);

// Render cards using destructuring
const container = document.getElementById("studentsContainer");
const avatarColors = ["#7c3aed", "#0891b2", "#059669"];
let output = "";

parsedData.forEach((student, index) => {
    const { name, age, semester, courses } = student;
    const badges = courses.map(c => `<span class="course-badge">${c}</span>`).join("");

    output += `
    <div class="student-card" style="animation-delay: ${index * 0.1}s">
        <div class="student-avatar" style="background: ${avatarColors[index % avatarColors.length]}">${name.charAt(0)}</div>
        <h3>${name}</h3>
        <div class="student-meta">
            <span class="meta-item">🎂 Age: <strong>${age}</strong></span>
            <span class="meta-item">📚 Sem: <strong>${semester}</strong></span>
        </div>
        <div class="courses-row">${badges}</div>
    </div>`;
});

container.innerHTML = output;