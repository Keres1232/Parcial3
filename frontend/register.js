// Registrar usuario
document.getElementById("RegisterButton").addEventListener("click", () => {
    const idJugadores = document.getElementById("idJugadores").value;
    const TiempoDeJuego = document.getElementById("TiempoDeJuego").value;
    const FrecuenciaDeDisparo = document.getElementById("FrecuenciaDeDisparo").value;
    const NumeroDeMuertes = document.getElementById("NumeroDeMuertes").value;
    const KillRatio = document.getElementById("KillRatio").value;
    const CantidadDeDinero = document.getElementById("CantidadDeDinero").value;

    if (!idJugadores || !TiempoDeJuego || !FrecuenciaDeDisparo || !NumeroDeMuertes || !KillRatio || !CantidadDeDinero ) {
        alert("All fields are required.");
        return;
    }

    const data = {
        idJugadores: idJugadores,
        TiempoDeJuego: TiempoDeJuego,
        FrecuenciaDeDisparo: FrecuenciaDeDisparo,
        NumeroDeMuertes: NumeroDeMuertes,
        KillRatio: KillRatio,
        CantidadDeDinero: CantidadDeDinero,
        
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
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while registering.");
        });
});