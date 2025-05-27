    document.getElementById("LoadPlayers").addEventListener("click", () => {
        fetch("http://localhost:3000/jugadores")
            .then(res => res.json())
            .then(data => {
                const tableBody = document.getElementById("playersTableBody");
                tableBody.innerHTML = ""; // Limpiar tabla
                data.forEach(jugador => {
                    const row = `
                        <tr>
                            <td>${jugador.idJugadores}</td>
                            <td>${jugador.TiempoDeJuego}</td>
                            <td>${jugador.FrecuenciaDeDisparo}</td>
                            <td>${jugador.NumeroDeMuertes}</td>
                            <td>${jugador.KillRatio}</td>
                            <td>${jugador.CantidadDeDinero}</td>
                        </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch(err => {
                console.error("Error al cargar jugadores:", err);
                alert("No se pudieron cargar los jugadores.");
            });
    });