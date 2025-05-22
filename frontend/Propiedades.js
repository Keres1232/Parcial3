// Registrar usuario
document.getElementById("RegisterButtonPropiedades").addEventListener("click", () => {
    const idPropiedades = document.getElementById("idPropiedades").value;
    const Inmuebles = document.getElementById("Inmuebles").value;
    const Propiedadescol = document.getElementById("Propiedadescol").value;
     const Vehiculos = document.getElementById("Vehiculos").value;


    if (!idPropiedades || !Inmuebles || !Propiedadescol || !Vehiculos) {
        alert("All fields are required.");
        return;
    }

    const data = {
        idPropiedades: idPropiedades,
        Inmuebles: Inmuebles,
        Propiedadescol: Propiedadescol,
        Vehiculos: Vehiculos
    };

    fetch("http://localhost:3000/registerPropiedades", {
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