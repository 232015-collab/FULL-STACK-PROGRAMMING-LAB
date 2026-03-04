class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.courses = new Set();
    }

    registerCourse(course) {
        this.courses.add(course);
    }
}

const studentMap = new Map();

const s1 = new Student(1, "Ali");
s1.registerCourse("JS");
s1.registerCourse("HTML");

studentMap.set(s1.id, s1);

function saveData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Data Saved Successfully!");
        }, 2000);
    });
}

saveData().then(msg => {
    // Hide spinner
    document.getElementById("statusCard").classList.add("hidden");

    // Show success banner
    const banner = document.getElementById("successBanner");
    banner.textContent = "✅  " + msg;
    banner.classList.add("visible");

    // Render student cards
    document.getElementById("resultSection").classList.add("visible");
    const container = document.getElementById("studentContainer");
    let output = "";

    studentMap.forEach(student => {
        const coursesArr = [...student.courses];
        const coursesBadges = coursesArr.map(c => `<span class="course-badge">${c}</span>`).join("");
        output += `
        <div class="student-card">
            <div class="student-avatar">${student.name.charAt(0)}</div>
            <div class="student-info">
                <h3>${student.name}</h3>
                <p class="student-id">Student ID: ${student.id}</p>
                <div class="courses-row">${coursesBadges}</div>
            </div>
        </div>`;
    });

    container.innerHTML = output;
});