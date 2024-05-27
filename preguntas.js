document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cantidadPreguntas = urlParams.get('amount');
    const categoria = urlParams.get('category');
    const dificultad = urlParams.get('difficulty');
    const tipoRespuesta = urlParams.get('type');
    const nombre = urlParams.get('nombre');
    
    const urlAPI = `https://opentdb.com/api.php?amount=${cantidadPreguntas}&category=${categoria}&difficulty=${dificultad}&type=${tipoRespuesta}`;
    let inicieActual = 0;
    let datos;
    let answerMultiple = [];
    const nombreJugador = document.querySelector('.nombre');
    nombreJugador.textContent = nombre;

    iniciarCronometro();
    fetch(urlAPI)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            return response.json();
        })
        .then(data => {
            datos = data;
            mostrarPreguntas(data.results[inicieActual]);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    function mostrarPreguntas(data) {
        if (inicieActual >= cantidadPreguntas) {
            avanzarSiguienteJugador();
        } else {
            const titleDiv = document.querySelector('.pregunta');
            const respuestaDiv = document.querySelector('.respuestas');
            const h2 = document.createElement('h2');
            
            titleDiv.innerHTML = "";
            respuestaDiv.innerHTML = "";
            answerMultiple = [];
            h2.classList.add('title-pregunta');
            h2.textContent = data.question;
            titleDiv.appendChild(h2); 
            
            if (data.type === "boolean") {
                crearBotonesBoolean(data);
            } else if (data.type === "multiple") {
                crearBotonesMultiple(data);
            }
        }
    }

    function crearBotonesBoolean(data) {
        const respuestaDiv = document.querySelector('.respuestas');
        const btnOpcion1 = document.createElement('button');
        const btnOpcion2 = document.createElement('button');
        
        btnOpcion1.classList.add("btn-opcion1");
        btnOpcion1.value = "True";
        btnOpcion1.textContent = "Verdadero";
        
        btnOpcion2.classList.add("btn-opcion2");
        btnOpcion2.value = "False";
        btnOpcion2.textContent = "Falso";

        respuestaDiv.appendChild(btnOpcion1);
        respuestaDiv.appendChild(btnOpcion2);

        btnOpcion1.addEventListener('click', () => verificarRespuesta(data, btnOpcion1.value));
        btnOpcion2.addEventListener('click', () => verificarRespuesta(data, btnOpcion2.value));
    }

    function crearBotonesMultiple(data) {
        const respuestaDiv = document.querySelector('.respuestas');
        
        answerMultiple = [...data.incorrect_answers, data.correct_answer];
        answerMultiple.sort(() => Math.random() - 0.5);
        
        answerMultiple.forEach(answer => {
            const btnMultiple = document.createElement('button');
            btnMultiple.classList.add('btn-multiple');
            btnMultiple.textContent = answer;
            btnMultiple.value = answer;
            respuestaDiv.appendChild(btnMultiple);
            btnMultiple.addEventListener('click', () => verificarRespuesta(data, btnMultiple.value));
        });
    }

    function verificarRespuesta(data, respuesta) {
        if (data.correct_answer === respuesta) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Correcto",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Incorrecto",
                showConfirmButton: false,
                timer: 1500
            });
        }
        inicieActual++;
        mostrarPreguntas(datos.results[inicieActual]);
    }

    function avanzarSiguienteJugador() {
        let jugadorActualIndex = parseInt(localStorage.getItem('jugadorActualIndex')) || 0;
        jugadorActualIndex++;
        const usuariosJugando = JSON.parse(localStorage.getItem('nombreJugadores'));

        if (jugadorActualIndex < usuariosJugando.length) {
            localStorage.setItem('jugadorActualIndex', jugadorActualIndex);
            window.location.href = 'opciones.html';
        } else {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Todos los jugadores han terminado",
                showConfirmButton: true,
            }).then(() => {
                // Puedes redirigir a una página de resultados o reiniciar el juego
                localStorage.removeItem('jugadorActualIndex');
                window.location.href = 'index.html';
            });
        }
    }

    function iniciarCronometro() {
        let cronometro = 0;
        const intervalo = setInterval(() => {
            document.getElementById('cronometro').textContent = `${cronometro} segundos`;
            cronometro++;
        }, 1000);
    }
});
