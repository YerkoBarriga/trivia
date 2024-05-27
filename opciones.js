// URL para obtener categorías de trivia
const categoriaURL = "https://opentdb.com/api_category.php";

// Variables para manejar el jugador actual y su información
const usuariosJugando = JSON.parse(localStorage.getItem('nombreJugadores'));
let jugadorActualIndex = parseInt(localStorage.getItem('jugadorActualIndex')) || 0;
const nombreJugadorActual = usuariosJugando[jugadorActualIndex];
document.getElementById('nombre-jugador').textContent = nombreJugadorActual;

// Esperar a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
});

// Función para cargar las categorías desde la API
function cargarCategorias() {
    const categorias = document.getElementById('categorias');
    fetch(categoriaURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos del servidor');
            }
            return response.json();
        })
        .then(data => {
            categorias.innerHTML = '<option value="">Seleccionar</option>';
            data.trivia_categories.forEach(category => {
                categorias.innerHTML += `<option value="${category.id}">${category.name}</option>`;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Función para manejar el envío del formulario y comenzar el juego
function enviarForm() {
    const numeroPregunta = document.getElementById('numero').value;
    const dificultad = document.getElementById('dificultad').value;
    const tipoRespuesta = document.getElementById('tipoRespuesta').value;
    const categorias = document.getElementById('categorias').value;

    if (!numeroPregunta || !dificultad || !tipoRespuesta || !categorias) {
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
    } else {
        const querystring = `amount=${numeroPregunta}&category=${categorias}&difficulty=${dificultad}&type=${tipoRespuesta}&nombre=${nombreJugadorActual}`;
        window.location.href = `preguntas.html?${querystring}`;
    }
}
