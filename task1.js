// ES6 Student Class
class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }

    // Returns initials for the avatar
    getInitial() {
        return this.name.charAt(0).toUpperCase();
    }

    generateCard(avatarGradient) {
        const coursesBadges = this.courses
            .map(c => `<span class="course-tag">${c}</span>`)
            .join('');

        return `
        <div class="student-card">
            <div class="card-top">
                <div class="student-avatar" style="background: ${avatarGradient}">
                    ${this.getInitial()}
                </div>
                <div class="card-meta">
                    <h3>${this.name}</h3>
                    <p class="student-id-badge">#ID-${this.id}</p>
                </div>
            </div>
            <div class="card-body">
                <div class="info-row">
                    <span class="info-label">Semester</span>
                    <span class="semester-badge">Semester ${this.semester}</span>
                </div>
                <div class="info-row" style="flex-direction: column; align-items: flex-start;">
                    <span class="info-label">Courses</span>
                    <div class="courses-wrap">${coursesBadges}</div>
                </div>
            </div>
        </div>`;
    }
}

// Avatar gradient palette
const avatarGradients = [
    'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    'linear-gradient(135deg, #ec4899, #f43f5e)',
    'linear-gradient(135deg, #10b981, #06b6d4)',
    'linear-gradient(135deg, #f59e0b, #ef4444)',
    'linear-gradient(135deg, #8b5cf6, #ec4899)',
];

// Creating students
const students = [
    new Student(101, "Ali Khan", 5, ["JavaScript", "HTML", "CSS"]),
    new Student(102, "Sara Ahmed", 6, ["React", "NodeJS", "MongoDB"]),
    new Student(103, "Hassan Raza", 4, ["Database", "Python", "OOP"]),
    new Student(104, "Ayesha Malik", 7, ["AI", "Machine Learning", "Cloud"]),
    new Student(105, "Usman Tariq", 3, ["C++", "DSA", "Operating System"]),
];

// Display students
const container = document.getElementById("studentsContainer");
let output = "";
students.forEach((student, i) => {
    output += student.generateCard(avatarGradients[i % avatarGradients.length]);
});
container.innerHTML = output;

// Staggered animation delays
document.querySelectorAll('.student-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.08}s`;
});

// Update Stats
document.getElementById("totalStudents").innerText = students.length;

const totalCourses = students.reduce((acc, s) => acc + s.courses.length, 0);
document.getElementById("totalCourses").innerText = totalCourses;

const avgSemester = Math.round(students.reduce((acc, s) => acc + s.semester, 0) / students.length);
document.getElementById("avgSemester").innerText = avgSemester;