function inicio(){
    const nombre        =document.getElementById('nombre-user').value.trim();
    const stringQuery   =`nombre=${(nombre)}`;
    
    if (nombre==="" || nombre==null) {
        alert("Llenar los campos")
    } else {
        console.log(window.location.href=`opciones.html?${stringQuery }`)
        window.location.href=`opciones.html?${stringQuery }`;
    }
}
