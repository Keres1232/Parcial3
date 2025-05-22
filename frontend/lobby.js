// Registrar usuario
document.getElementById("RegisterButtonLonnies").addEventListener("click", () => {
    const idLobbies = document.getElementById("idLobbies").value;
    const Duracion = document.getElementById("Duracion").value;
    const Ubicacion = document.getElementById("Ubicacion").value;


    if (!idLobbies || !Duracion || !Ubicacion) {
        alert("All fields are required.");
        return;
    }

    const data = {
        idLobbies: idLobbies,
        Duracion: Duracion,
        Ubicacion: Ubicacion,
        
    };

    fetch("http://localhost:3000/registerlobbies", {
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
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while registering.");
        });
});