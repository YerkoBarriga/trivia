// Definir la URL de la API que proporciona las categorías de trivia
const categoriaURL = "https://opentdb.com/api_category.php";


    /*obteniendo datos del index */
    const datoIndex =window.location.search;
    // Parsear el querystring para obtener el valor del nombre
    const urlParams = new URLSearchParams(datoIndex);
    const nombree   = urlParams.get('nombre');
    const nombreMenu=document.querySelector('.nombre');
    const namee     =document.getElementById('nombre-jugador');
    namee.textContent=nombree;
    nombreMenu.textContent=nombree;



// Esperar a que el contenido del DOM (Document Object Model) esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Cuando el DOM está cargado, llamar a la función cargarCategorias()
    cargarCategorias();

});



// Definir la función cargarCategorias()
function cargarCategorias() {
    // Obtener el elemento select con el id 'categorias'
    const categorias = document.getElementById('categorias');
    // Realizar una solicitud Fetch a la URL de la categoría
    fetch(categoriaURL)
        // Manejar la respuesta de la solicitud Fetch
        .then(response => {
            // Verificar si la respuesta es exitosa (status code 200-299)
            if (!response.ok) {
                // Si la respuesta no es exitosa, lanzar un error
                throw new Error('Error al cargar los datos del servidor');
            }
            // Si la respuesta es exitosa, convertir la respuesta a formato JSON
            return response.json();
        })
        // Manejar los datos JSON obtenidos de la respuesta
        .then(data => {
            console.log(data);
            // Limpiar el contenido del elemento select antes de agregar nuevas opciones
            categorias.innerHTML = '';
            // Agregar una opción predeterminada "Seleccionar" al principio del select
            categorias.innerHTML += '<option value="">Seleccionar</option>';
            // Iterar sobre cada categoría en los datos obtenidos
            data.trivia_categories.forEach(category => {
                // Para cada categoría, agregar una nueva opción al elemento select
                categorias.innerHTML += `<option value="${category.id}">${category.name}</option>`;
            });
        })
        // Manejar cualquier error que pueda ocurrir durante el proceso
        .catch(error => {
            // Imprimir el error en la consola del navegador
            console.error('Error:', error);
        });
}



function enviarForm(){
    const numeroPregunta    =document.getElementById('numero').value;
    const dificultad        =document.getElementById('dificultad').value;
    const tipoRespuesta     =document.getElementById('tipoRespuesta').value;
    const categorias        =document.getElementById('categorias').value;
    const querystring       =`amount=${numeroPregunta }&category=${categorias}&difficulty=${dificultad}&type=${tipoRespuesta}`;
    window.location.href    =`preguntas.html?${querystring}`;
}