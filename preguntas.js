    document.addEventListener('DOMContentLoaded',()=>{
    const urlParams         = new URLSearchParams(window.location.search);
    const cantidadPreguntas = urlParams.get('amount');
    const categoria         = urlParams.get('category');
    const dificultad        = urlParams.get('difficulty');
    const tipoRespuesta     = urlParams.get('type');
    
    const urlAPI = `https://opentdb.com/api.php?amount=${cantidadPreguntas}&category=${categoria}&difficulty=${dificultad}&type=${tipoRespuesta}`;
    let inicieActual        =0;
    let datos;
    let answerMultiple=[];
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
            // Procesar los datos y mostrar las preguntas en la página
            console.log(data.results[inicieActual]);
            mostrarPreguntas(data.results[inicieActual]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        //mostrar preguntas
        function mostrarPreguntas(data){
            alert(cantidadPreguntas)
            if (inicieActual>(datos.length)-1){
                window.location.href=`opciones.html`;
            }else{
                const titleDiv      =   document.querySelector('.pregunta');
                const respuestaDiv  =   document.querySelector('.respuestas');
                const h2            =   document.createElement('h2');
                //falso y verdadero
                const btnOpccio1    =   document.createElement('button');
                btnOpccio1.classList.add("btn-opcion1");
                btnOpccio1.value="True";
                btnOpccio1.textContent="Verdadero";
                
                const btnOpccio2    =   document.createElement('button');
                btnOpccio2.classList.add("btn-opcion2");
                btnOpccio2.value="False";
                btnOpccio2.textContent="Falso";
                

                titleDiv.innerHTML="";
                respuestaDiv.innerHTML="";
                answerMultiple=[];
                h2.classList.add('title-pregunta');
                h2.textContent      =data.question;
                titleDiv.appendChild(h2); 
                
                if (data.type==="boolean") {
                    respuestaDiv.appendChild(btnOpccio1);
                    respuestaDiv.appendChild(btnOpccio2);
                    const btnVerdad =document.querySelector('.btn-opcion1');
                    btnVerdad.addEventListener('click',()=>{
                        if (data.correct_answer===btnVerdad.value) {
                            verificarAvanzar(data);
                        }else{
                            verificarAvanzar(data);
                        }
                    
                    });
                }
                if (data.type==="multiple" ) {
                    for (let i = 0; i < data.incorrect_answers.length; i++) {
                        answerMultiple.push(data.incorrect_answers[i]);
                    }
                    answerMultiple.push(data.correct_answer);
                    answerMultiple.sort(()=>Math.random()-0.5);
                    //generando botones opciones multiples
                    
                    for (let i = 0; i < answerMultiple.length; i++) {

                        const opcionMultiple    =document.createElement('button');
                        
                        opcionMultiple.classList.add('btn-multiple');
                        opcionMultiple.textContent=answerMultiple[i];
                        opcionMultiple.value=answerMultiple[i];
                        respuestaDiv.appendChild(opcionMultiple);

                    }
                    const btnseleccionMultiple = document.querySelectorAll('.btn-multiple');
                    
                    btnseleccionMultiple.forEach(boton =>{
                    
                        boton.addEventListener('click', () => {
                    
                            if (data.correct_answer!==boton.value) {
                                verificarMultipleMal(data);
                            
                            }
                            else{
                            verificaMultiple(data);
                            
                            }
                        });
                    });
                }  
            }       
        }

        function iniciarCronometro(){
            
            let cronometro=0;
            const intervalo=setInterval(()=>{
                document.getElementById('cronometro').textContent=`${cronometro } - segundos`;
                cronometro++;
            },1000);

        }

        function verificarAvanzar(data){
            if(data.correct_answer==="True"){
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Correcto",
                    showConfirmButton: false,
                    timer: 1500
                  });
                inicieActual++;
                mostrarPreguntas(datos.results[inicieActual]);
            }else{
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Incorrecto Trivilin",
                    imageUrl: "images.jpeg",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                    showConfirmButton: false,
                    timer: 3000
                  });
                inicieActual++;
                mostrarPreguntas(datos.results[inicieActual]);
            }
        }
        function verificarMultipleMal(data){
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Incorrecto Trivilin",
                imageUrl: "images.jpeg",
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                showConfirmButton: false,
                timer: 3000
              });
            inicieActual++;
            mostrarPreguntas(datos.results[inicieActual]);
        }
        function verificaMultiple(data){
            
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Correcto",
                showConfirmButton: false,
                timer: 1500
              });
            inicieActual++;
            mostrarPreguntas(datos.results[inicieActual]);
        }

        // Botón "Siguiente" para avanzar a la siguiente pregunta
        const btnSiguiente = document.querySelector('#siguiente');
        btnSiguiente.addEventListener('click', () => {
            console.log(datos);
            inicieActual++; // Avanzar al siguiente índice
            mostrarPreguntas(datos.results[inicieActual]);
        });       
});

