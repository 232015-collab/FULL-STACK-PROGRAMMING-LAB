function fetchUsers() {
    return new Promise((resolve, reject) => {
        let success = true;

        setTimeout(() => {
            if (success) {
                resolve([
                    { id: 1, name: "Ali", role: "Frontend Developer" },
                    { id: 2, name: "Sara", role: "Backend Developer" },
                    { id: 3, name: "Hassan", role: "Full Stack Developer" },
                    { id: 4, name: "Ayesha", role: "UI / UX Designer" }
                ]);
            } else {
                reject("Failed to load users");
            }
        }, 3000);
    });
}

fetchUsers()
    .then(users => {
        // Hide spinner & status card
        document.getElementById("statusCard").classList.add("hidden");
        document.getElementById("usersSection").classList.add("visible");

        const container = document.getElementById("usersContainer");
        let output = "";
        users.forEach(user => {
            output += `
            <div class="user-card">
                <div class="user-avatar">${user.name.charAt(0)}</div>
                <h3>${user.name}</h3>
                <p class="user-role">${user.role}</p>
                <span class="user-id">ID: ${user.id}</span>
            </div>`;
        });
        container.innerHTML = output;
    })
    .catch(error => {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("statusText").textContent = "Error: " + error;
        document.getElementById("statusCard").classList.add("error");
    });