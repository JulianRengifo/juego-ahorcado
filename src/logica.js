

function agregarPalabra() {
    
    // Mostrar la ventana deseada
    

     // Ocultar el botón principal
    document.getElementById('agregar').style.display = 'none';
    document.getElementById('iniciar').style.display = 'none';
    
     // Mostrar el nuevo botón
    document.getElementById('ventana1').style.display = "inline-block";
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
    document.getElementById('ventana1').style.display = "none";
    document.getElementById('mensaje').style.display= "none";

    document.getElementById('nuevo').style.display = "inline-block";
    document.getElementById('desistir').style.display = "inline-block";
    document.getElementById('hombre').style.display = "inline-block";
    document.getElementById('hombre-ahorcado').style.display = "inline-block";
    document.getElementById('adivinado').style.display = "inline-block";
    document.getElementById('errado').style.display = "inline-block";
}

function cancelar() {

    document.getElementById('guardar').style.display = "none";
    document.getElementById('cancelar').style.display = "none";
    document.getElementById('ventana1').style.display = "none";
    document.getElementById('mensaje').style.display = "none";

    document.getElementById('iniciar').style.display = "inline-block";
    document.getElementById('agregar').style.display = "inline-block";

}

(function(){
    'use strict'

    var juego = {
        palabra: "ALURA",
        estado: 1,
        adivinado:["A","L"],
        errado: ["B","J","K","C"]
    }

    var $html ={
        hombre: document.getElementById("hombre"),
        adivinado: document.querySelector("#adivinado"),
        errado: document.querySelector("#errado")
    }

    function dibujar(juego) {
        //Actualizar la imagen del muñeco
        var $elem
        $elem = $html.hombre
        $elem.src = "images/estado" + juego.estado + ".png";

        // Creamos las letras adivinadas
        var palabra = juego.palabra       // Obtiene la palabra del objeto 'juego'
        var adivinado = juego.adivinado
        $elem = $html.adivinado
        for (let letra of palabra) {   // Itera sobre cada letra de la palabra
            let $span = document.createElement("span")  // Crea un nuevo elemento <span> para representar la letra
            let $txt = document.createTextNode("")      // Crea un nodo de texto vacío para contener la letra
            
            // Verifica si la letra ha sido adivinada
            if (adivinado.indexOf(letra) >= 0) {   // Si la letra está en el array de letras adivinadas
                $txt.nodeValue = letra            // Establece el texto del nodo de texto como la letra adivinada
            }
            $span.classList.add("inline-block", "w-14", "h-16", "align-middle", "border-b-4", "border-solid", "border-dark-blue", "ml-1")
            $span.appendChild($txt)    // Agrega el nodo de texto al <span>
            $elem.appendChild($span)   // Agrega el <span> al elemento contenedor
        }

        // Creamos las letras erradas
        var errado = juego.errado
        $elem = $html.errado
        for (let letra of errado) {    // Recorremos las letras que se han errado
            let $span = document.createElement("span")
            let $txt = document.createTextNode(letra)
            $span.classList.add("ml-4")
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
    }

    console.log(juego);
    dibujar(juego);

}());
