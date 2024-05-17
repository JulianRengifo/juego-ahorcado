    
    var palabras = [
        "ALURA", "ORACLE", "FRONTEND", "BACKEND", "JAVA", "CODIGO", "ERROR", "DUBSTEP"
    ]

    // variable para almacenar la configuracion actual
    var juego = null

    var $html ={
        hombre: document.getElementById("hombre"),
        adivinado: document.querySelector("#adivinado"),
        errado: document.querySelector("#errado")
    }

    function dibujar(juego) {
        //Actualizar la imagen del muñeco
        var $elem
        $elem = $html.hombre

        var estado = juego.estado
        if (estado === 8){        // Recicla la imagen de un estado anterior 
            estado = juego.previo
        }

        $elem.src = "images/estado" + estado + ".png";

        // Creamos las letras adivinadas
        var palabra = juego.palabra       // Obtiene la palabra del objeto 'juego'
        var adivinado = juego.adivinado
        $elem = $html.adivinado
        $elem.innerHTML = ""       // Borramos los elementos anteriores
        for (let letra of palabra) {   // Itera sobre cada letra de la palabra
            let $span = document.createElement("span")  // Crea un nuevo elemento <span> para representar la letra
            let $txt = document.createTextNode("")      // Crea un nodo de texto vacío para contener la letra
            
            // Verifica si la letra ha sido adivinada
            if (adivinado.has(letra)) {   // Si la letra está en el array de letras adivinadas
                $txt.nodeValue = letra            // Establece el texto del nodo de texto como la letra adivinada
            }
            $span.classList.add("inline-block", "w-14", "h-16", "align-middle", "border-b-4", "border-solid", "border-dark-blue", "ml-1")
            $span.appendChild($txt)    // Agrega el nodo de texto al <span>
            $elem.appendChild($span)   // Agrega el <span> al elemento contenedor
        }

        // Creamos las letras erradas
        var errado = juego.errado
        $elem = $html.errado
        $elem.innerHTML = ""       // Borramos los elementos anteriores
        for (let letra of errado) {    // Recorremos las letras que se han errado
            let $span = document.createElement("span")
            let $txt = document.createTextNode(letra)
            $span.classList.add("ml-4")
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
    }

    function adivinar (juego, letra){
        var estado = juego.estado
        // si se gana o pierde, termina el juego
        if ( estado === 1 || estado === 8){
            return
        }

        var adivinado = juego.adivinado
        var errado = juego.errado
        // si se a adivinado o errado la letra 
        if(adivinado.has(letra) || errado.has(letra)){ // has nos indica si pertenece al conjunto adivinado o errado
            return
        }

        var palabra = juego.palabra
        var letras = juego.letras
        // Si la letra ingresada hace parte de la pabra
        if(letras.has(letra)){
            adivinado.add(letra)  // Agregamos a la lista de letras adivinadas
            juego.restante--      //Actualizamos las letras restantes


            // Si ya se a ganado. se debe indicar
            if(juego.restante === 0){
                juego.previo = juego.estado   // muestra el estado antes de ganar
                juego.estado = 8
            }
        }else{
        // si la letra ingreSada no hace parte de la palabra el muñeco cammbiara de estado
            juego.estado--
            // Agregamos la letra errada a la lista de las letras erradas
            errado.add(letra)
        }
    }
    //captura las pulsaciones de teclas en la ventana del navegador, convierte las letras a mayúscula y luego intenta
    // adivinar la letra presionada utilizando una función llamada adivinar. Después de intentar adivinar la letra, actualiza la representación visual del juego llamando a la función dibujar.

    window.onkeypress = function adivinarletra(e){ //se ejecutará cuando se presione una tecla. Toma un parámetro e
        var letra = e.key  //Obtiene la tecla presionada del objeto de evento e y la guarda en la variable letra.
        letra = letra.toUpperCase() //Convierte la tecla presionada a mayúscula
        if(/[^A-ZÑ]/.test(letra)){  // Verifica que no se ingrese un caracter erroneo
            return
        }
        adivinar(juego, letra)
        var estado = juego.estado
        if(estado === 8){
            setTimeout(function(){  // Esta función vacía no realiza ninguna operación específica, simplemente se ejecuta después de que haya transcurrido el tiempo especificado por setTimeout
                alert("Felicidades ganaste")
            }, 500)   // Espera medio segundo antes de mostrar la alerta
        }else if(estado ===1){
            let palabra = juego.palabra
            setTimeout(function() {
                alert("Lo siento, perdiste... la palabra era: " + palabra);
            }, 500);
        }
        dibujar(juego) // Al cambiar el estado por la letras ingresadas se debe volver a dibujar el muñeco
    }

    window.nuevoJuego = function nuevoJuego(){
        var palabra = palabraAleatoria()
        juego = {}
        juego.palabra = palabra
        juego.estado = 7
        juego.adivinado = new Set()
        juego.errado = new Set()

        // Devuelve las letras que contiene la palabra
        var letras = new Set()
        for(let letra of palabra){
            letras.add(letra)
        }
        juego.letras = letras   // cuantas letras hay
        juego.restante = letras.size

        dibujar(juego)
        console.log(juego)
    }

    function palabraAleatoria(){
        var index = Math.trunc(Math.random() * palabras.length);
        return palabras[index];
    }

    nuevoJuego()

    function iniciar(){

    document.getElementById('agregar').style.display = 'none';
    document.getElementById('iniciar').style.display = 'none';

    document.getElementById('nuevo').style.display = "inline-block";
    document.getElementById('desistir').style.display = "inline-block";
    document.getElementById('hombre').style.display = "inline-block";
    document.getElementById('hombre-ahorcado').style.display = "inline-block";
    document.getElementById('adivinado').style.display = "inline-block";
    document.getElementById('errado').style.display = "inline-block"
}

function desistir(){
    document.getElementById('nuevo').style.display = "none";
    document.getElementById('desistir').style.display = "none";
    document.getElementById('hombre').style.display = "none";
    document.getElementById('hombre-ahorcado').style.display = "none";
    document.getElementById('adivinado').style.display = "none";
    document.getElementById('errado').style.display = "none"

    document.getElementById('agregar').style.display = 'inline-block';
    document.getElementById('iniciar').style.display = 'inline-block';
}

function agregarPalabra() {


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
    var palabraGuardada = document.getElementById("ingresePalabra").value;

    // Verificar que la palabra cumpla con ciertas condiciones (mayúscula y de 8 caracteres)
    if (palabraGuardada.length > 8 || palabraGuardada !== palabraGuardada.toUpperCase()) {
        alert("Por favor, ingresa una palabra de 8 o menos caracteres en mayúsculas.");
        return; // Detener la ejecución si la palabra no cumple con las condiciones
    };

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

    var letras = new Set()
        for(let letra of palabraGuardada){
            letras.add(letra)
        }
    
    juego = {
        palabra: palabraGuardada,
        estado: 7, // Estado inicial del juego
        adivinado: new Set(), // Conjunto para almacenar las letras adivinadas
        errado: new Set(), // Conjunto para almacenar las letras erradas
        letras: letras, // Conjunto para almacenar todas las letras de la palabra
        restante: letras.size // Número de letras restantes por adivinar
    };

    dibujar(juego);
    console.log("Palabra guardada:", palabraGuardada);
}

function cancelar() {

    document.getElementById('guardar').style.display = "none";
    document.getElementById('cancelar').style.display = "none";
    document.getElementById('ventana1').style.display = "none";
    document.getElementById('mensaje').style.display = "none";

    document.getElementById('iniciar').style.display = "inline-block";
    document.getElementById('agregar').style.display = "inline-block";
}

