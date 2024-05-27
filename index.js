const inputText = document.getElementById('numero-jugadores');
const jugadores = document.querySelector('.contenedor-jugadores');
inputText.addEventListener('input',()=>{
    jugadores.innerHTML="";
    const numeroJugadores = parseInt(inputText.value);
    if (numeroJugadores>0 && !isNaN(numeroJugadores)) {
        for (let i = 0; i < numeroJugadores; i++) {
            const inputJugador  =   document.createElement('input');
            inputJugador.classList.add('jugador');
            inputJugador.type='text';
            inputJugador.placeholder = `Jugador ${i + 1}`;
            jugadores.appendChild(inputJugador);
        }
    }
});

function inicio(){
    let valores=[];
    const numeroJugadore    = document.querySelectorAll('.jugador');
    // Verificar si todos los campos están llenos
    for (let i = 1; i < numeroJugadore.length; i++) {
        // Si algún campo está vacío, mostrar alerta y salir de la función
        if (numeroJugadore[i].value.trim() === '') {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Por favor llene todos los campos de los jugadores",
                imageUrl: "bobEsponja.gif",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                showConfirmButton: false,
                timer: 3000
              });
            return;
        }
        valores.push(numeroJugadore[i].value.trim());
    }
    //guardo y convierto a la misma vez mi array en una cadena Json
    localStorage.setItem('nombreJugadores',JSON.stringify(valores));
    localStorage.setItem('jugadorActual', 0);
    window.location.href = `opciones.html`
    
}
