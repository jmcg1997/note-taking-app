console.log("✅ script.js loaded!");

// ✅ Fetch and display notes from the API
window.fetchNotes = async function fetchNotes() {
    console.log("🔍 fetchNotes() called");

    const token = localStorage.getItem("token");
    console.log("📡 Token found in localStorage:", token);

    if (!token) {
        console.error("❌ No token found.");
        alert("Session expired. Please log in again.");
        window.location.href = "/";
        return;
    }

    try {
        const response = await fetch("/api/notes", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!response.ok) throw new Error(`Failed to fetch notes: ${response.status}`);

        const notes = await response.json();
        console.log("✅ Notes received:", notes);
        renderNotes(notes);
    } catch (error) {
        console.error("❌ Error fetching notes:", error);
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/";
    }

};

// ✅ Render notes dynamically in the UI
function renderNotes(notes) {
    const notesList = document.getElementById("notes-list");
    if (!notesList) {
        console.error("❌ Element #notes-list not found in the DOM.");
        return;
    }

    notesList.innerHTML = "";
    notes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.setAttribute("data-id", note._id);  // ✔️ Agrega el data-id

        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <small>Created on: ${new Date(note.createdAt).toLocaleDateString()}</small>
            <button class="btn btn-edit" onclick="startEditNote('${note._id}', '${note.title}', '${note.content}')">Edit</button>
            <button class="btn btn-delete" onclick="confirmAndDelete('${note._id}')">Delete</button>
        `;

        notesList.appendChild(noteElement);
    });
}


// ✅ Start editing a note - replace content with input fields
window.startEditNote = function (noteId, currentTitle, currentContent) {
    const confirmed = confirm("Do you want to edit this note?");
    if (!confirmed) return;

    const noteElement = document.querySelector(`.note[data-id="${noteId}"]`);
    if (!noteElement) {
        console.error(`❌ Note with ID ${noteId} not found in DOM.`);
        return;
    }

    // Replace the content with editable fields
    noteElement.innerHTML = `
        <input type="text" id="edit-title-${noteId}" value="${currentTitle}" />
        <textarea id="edit-content-${noteId}">${currentContent}</textarea>
        <button class="btn btn-save" onclick="confirmAndUpdate('${noteId}')">Save</button>
        <button class="btn btn-cancel" onclick="fetchNotes()">Cancel</button>
    `;
};

// ✅ Confirm and update a note (PUT request)
window.confirmAndUpdate = async function (noteId) {
    const token = localStorage.getItem("token");
    const updatedTitle = document.getElementById(`edit-title-${noteId}`).value.trim();
    const updatedContent = document.getElementById(`edit-content-${noteId}`).value.trim();

    if (!updatedTitle || !updatedContent) {
        alert("Title and content cannot be empty.");
        return;
    }

    try {
        const response = await fetch(`/api/notes/${noteId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: updatedTitle, content: updatedContent })
        });

        if (!response.ok) throw new Error("Failed to update note.");

        console.log("✅ Note updated successfully!");
        fetchNotes();
    } catch (error) {
        console.error("❌ Error updating note:", error);
    }
};

// ✅ Confirm and delete a note (DELETE request)
window.confirmAndDelete = async function (noteId) {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`/api/notes/${noteId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Failed to delete note.");

        console.log("Note deleted successfully!");
        fetchNotes();
    } catch (error) {
        console.error("❌ Error deleting note:", error);
    }
};

// ✅ Handle new note creation (POST request)
document.getElementById("new-note-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const token = localStorage.getItem("token");

    if (!title || !content) {
        alert("Title and content cannot be empty.");
        return;
    }

    try {
        const response = await fetch("/api/notes", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content })
        });

        if (!response.ok) throw new Error("Failed to create note.");

        console.log("✅ Note added successfully!");
        fetchNotes();
        document.getElementById("new-note-form").reset();
    } catch (error) {
        console.error("❌ Error adding note:", error);
    }
});

// ✅ Helper to find note index in the list (for correct DOM selection)
function findNoteIndex(noteId) {
    const notesList = document.getElementById("notes-list");
    const notes = Array.from(notesList.children);
    return notes.findIndex(note => note.innerHTML.includes(`startEditNote('${noteId}'`));
}

// ✅ Logout process - clear storage and redirect
function handleLogout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        localStorage.removeItem("token");   // ✅ Remove token from localStorage
        localStorage.removeItem("username");
        window.location.href = "/";          // ✅ Redirect to login page
    }
}

// ✅ DOMContentLoaded - Core initialization logic
document.addEventListener("DOMContentLoaded", () => {

    const authButton = document.getElementById("auth-button");
    const usernameElement = document.getElementById("user-name");
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    // Handle navbar button text and welcome message based on auth state
    if (token && username) {
        authButton.innerText = "Logout";
        authButton.onclick = handleLogout;
        usernameElement.innerText = `Welcome, ${username}`;
    } else {
        authButton.innerText = "Login";
        authButton.onclick = () => window.location.href = "/";
        usernameElement.innerText = "Welcome, Guest";
    }

    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) logoutButton.addEventListener("click", handleLogout);

    // Additional logic for specific pages (notes & home)
    if (window.location.pathname === "/notes") {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        if (!token) {
            alert("You must be logged in to access notes.");
            window.location.href = "/";
        } else {
            fetchNotes();
        }
        const usernameElement = document.getElementById("user-name");
        if (username) {
            usernameElement.innerText = `Welcome, ${username}`;
        } else {
            usernameElement.innerText = "Welcome, Guest";
        }
    }

    if (window.location.pathname === "/home") {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");


        if (!token) {
            alert("You must be logged in to access home.");
            window.location.href = "/";
        } else {
            document.getElementById("user-name").innerText = username || "Guest";
            fetchNotes();
        }

        const usernameElement = document.getElementById("user-name");
        if (username) {
            usernameElement.innerText = `Welcome, ${username}`;
        } else {
            usernameElement.innerText = "Welcome, Guest";
        }
    }

    // Handle login form submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                if (!response.ok) {
                    alert(data.message || "Login failed.");
                    return;
                }

                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                window.location.href = "/home";
            } catch (error) {
                console.error("Login error:", error);
            }
        });
    }

    // Handle registration form submission
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("register-username").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value.trim();

            // Send registration data to the backend
            try {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, email, password })
                });

                const data = await response.json();
                if (!response.ok) {
                    alert(data.message || "Registration failed.");
                    return;
                }

                alert("✅ Registration successful!");
                registerForm.reset();
            } catch (error) {
                console.error("❌ Registration error:", error);
            }
        });
    }
});