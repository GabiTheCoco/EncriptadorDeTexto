
const botonCifrado = document.querySelector(".cifrado"); //captura del boton encriptar
const botonDescifrado = document.querySelector(".descifrado"); //captura del boton desencriptar
const cuadroEntradaTexto = document.querySelector(".ingresoTexto"); //captura del cuadro de entrada de texto (textarea)
const cuadroSalidaTexto = document.querySelector(".cuadroSalidaTexto"); //captura del cuadro de salida de texto (textarea)

const vocales = ["a", "e", "i", "o", "u"], encriptacion = ["ai", "enter", "imas", "ober", "ufat"]; //llave de encriptación

var salidaTexto = crearCuadroSalidaTexto(), 
botonCopiar = crearBotonCopiar(), 
elementosCuandoNoHayTexto = [],
elementosCuandoHayTexto = [],
textoCifrado = '', 
textoDescifrado = ' ';

const regExPermitido = /[a-z \s]/; //expresion reglar para buscar minusculas y espacios
const regExMayus= /[A-Z0-9]/; //expresion regular para buscar mayúsculas o dígitos

capturarElementos(); //captura los elementos a borrar de la pantalla



function cifrado(frase){
    var aux = '', indiceVocal;

    for( let i=0; i<frase.length; i++){
        if (vocales.includes(frase[i])) {
            indiceVocal = vocales.findIndex(elemento => elemento === frase[i]);
            aux += encriptacion[indiceVocal];
        }else{
            aux+=frase[i];
        }
    }
    
    return aux;
}

function descifrado(frase){
    for( let i=0; i<vocales.length; i++){
        frase = frase.replaceAll(encriptacion[i], vocales[i]);
    }

    return frase;
}   

function crearCuadroSalidaTexto(){

    //se crea un elemento textarea con el atributo readonly
    var saliditaTexto = document.createElement("textarea");

    // agregado del atributo readonly y de la clase correspondiente
    var readonly = document.createAttribute("readonly");
    saliditaTexto.setAttributeNode(readonly);
    saliditaTexto.classList.add("salidaTexto");

    return saliditaTexto;
}

function crearBotonCopiar(){

    //se crea un boton del tipo sbmit para copiar
    var btnCopiar = document.createElement("button");

    //se le agrega la clase correspondiente y el texto dentro del mismo.
    btnCopiar.classList.add("botonCopiar");
    btnCopiar.textContent = "Copiar texto";

    return btnCopiar;
}

function capturarElementos(){
    
    //captura los elementos que se van a borrar en medio una vez se apriete el boton de encriptado
    var munieco = document.querySelector(".munieco");
    var p1 = document.querySelector(".p1");
    var p2 = document.querySelector(".p2");
    
    elementosCuandoNoHayTexto.push(munieco);
    elementosCuandoNoHayTexto.push(p1);
    elementosCuandoNoHayTexto.push(p2);

    elementosCuandoHayTexto.push(salidaTexto);
    elementosCuandoHayTexto.push(botonCopiar);
}

//agarra los objetos y los hace invisibles

function invisible(arregloDeElementos){

    arregloDeElementos.forEach(function(elemento){
        elemento.classList.add("invisible"); //les agrega la clase invisible, lo que no les permite ser visibles en pantalla
    });
}

function visible(arregloDeElementos){

    arregloDeElementos.forEach(function(elemento){
        elemento.classList.remove("invisible"); //les agrega la clase invisible, lo que no les permite ser visibles en pantalla
    });
}

botonCifrado.addEventListener("click", function(){

    if((cuadroEntradaTexto.value !== "") && (regExPermitido.test(cuadroEntradaTexto.value)) && !(regExMayus.test(cuadroEntradaTexto.value))){

        invisible(elementosCuandoNoHayTexto);
        visible(elementosCuandoHayTexto);

        //agregado del cuadro de texto y botones a la etiqueta padre .cuadroSalidaTexto (section)
        cuadroSalidaTexto.appendChild(salidaTexto);
        cuadroSalidaTexto.appendChild(botonCopiar);
    
        //encriptado
        textoCifrado = cifrado(cuadroEntradaTexto.value);
        salidaTexto.value = textoCifrado;

    }else{
        invisible(elementosCuandoHayTexto);
        visible(elementosCuandoNoHayTexto);
    }

});

botonDescifrado.addEventListener("click", function(){
    //desencriptado
    if((cuadroEntradaTexto.value !== "") && (regExPermitido.test(cuadroEntradaTexto.value) && !(regExMayus.test(cuadroEntradaTexto.value)))){

        invisible(elementosCuandoNoHayTexto);
        visible(elementosCuandoHayTexto);

        //agregado del cuadro de texto y botones a la etiqueta padre .cuadroSalidaTexto (section)
        cuadroSalidaTexto.appendChild(salidaTexto);
        cuadroSalidaTexto.appendChild(botonCopiar);

        textoDescifrado = descifrado(cuadroEntradaTexto.value);
        salidaTexto.value = textoDescifrado;
        
    }else{
        invisible(elementosCuandoHayTexto);
        visible(elementosCuandoNoHayTexto);
    }

});

botonCopiar.addEventListener("click", function(){
    salidaTexto.select(); //selecciona el contenido dentro del textarea
    document.execCommand("copy"); // copia el contenido al portapapeles
});