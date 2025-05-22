// Registrar usuario
document.getElementById("SignInButton").addEventListener("click", () => {
    const username = document.getElementById("SignIn").value;
    const password = document.getElementById("password").value;
    const passwordRepeat = document.getElementById("passwordRepeat").value;

    if (password !== passwordRepeat) {
        alert("Passwords do not match.");
        return;
    }

    if (!username || !password) {
        alert("All fields are required.");
        return;
    }

    const data = {
        username: username,
        password: password
    };

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Registration failed.");
            }
        })
        .then(message => {
            alert(message);
            document.getElementById("SignIn").value = "";
            document.getElementById("password").value = "";
            document.getElementById("passwordRepeat").value = "";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while registering.");
        });
});

// Buscar usuario por username
document.getElementById("LogInButton").addEventListener("click", () => {
    const username = document.getElementById("LogIn").value;
    const password = document.getElementById("LogPassword").value;

    if (!username || !password) {
        alert("Please enter a username.");
        return;
    }

    fetch(`http://localhost:3000/user/${username}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error("User not found.");
            } else {
                throw new Error("Error fetching user.");
            }
        })
        .then(user => {
            if (user.password == password) {
                alert(`${user.iduser} register`);
            }else{
                alert(`Wrong password`);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert(error.message);
        });
});