function agregarPalabra(idVentana) {
    // Ocultar todas las ventanas
    var ventanas = document.querySelectorAll('.hidden');
    ventanas.forEach(function(ventana) {
        ventana.classList.add('hidden');
    });
    // Mostrar la ventana deseada
    document.getElementById(idVentana).classList.remove('hidden');

     // Ocultar el botón principal
    document.getElementById('agregar').style.display = 'none';
    document.getElementById('iniciar').style.display = 'none';
    
     // Mostrar el nuevo botón
    document.getElementById('guardar').style.display = 'inline-block'
    document.getElementById('cancelar').style.display = 'inline-block';
    document.getElementById('mensaje').style.display = 'inline-block';
}

function guardarPalabra() {
    // Obtener el valor del textarea
    var palabra = document.getElementById("palabra").value;

    // Hacer algo con la palabra, como mostrarla en la consola
    console.log("Palabra guardada:", palabra);

    document.getElementById('guardar').style.display = "none";
    document.getElementById('cancelar').style.display = "none";

    document.getElementById('nuevo').style.display = "inline-block";
    document.getElementById('desistir').style.display = "inline-block";


}
