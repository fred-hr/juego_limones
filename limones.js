let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=50;
const ANCHO_PERSONAJE=30;
const ANCHO_LIMON=20;
const ALTURA_LIMON=20;

let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;
let puntaje=0;
let vidas=3;
let velocidadCaida=200;
let intervalo;
let personajeVisible=true;
let pausaJuego=false;

function iniciar(){
    intervalo = setInterval(bajarLimon,velocidadCaida)//1er parametro recibe una funcion, 2do parametro tiempo en milisegundos
    mostrarSpan("txtVidas",vidas);
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}
function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}
function dibujarPersonaje(){
    ctx.fillStyle="orange";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    if(pausaJuego==false){
        if(personajeX>0){
            personajeX=personajeX-20;
        }
        
    }
        actualizarPantalla();
}
function moverDerecha(){
    if(pausaJuego==false){
        if(personajeX+ANCHO_PERSONAJE<canvas.width){
            personajeX=personajeX+20;
        }
    }
        actualizarPantalla();
}
function actualizarPantalla(){
    limpiarCanvas();
    dibujarSuelo();

    if(personajeVisible==true){
        dibujarPersonaje();
    }
    dibujarLimon();

}
function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);
}
function bajarLimon(){
    limonY=limonY+10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}
function detectarAtrapado(){
    if(limonX+ANCHO_LIMON>personajeX && limonX<personajeX+ANCHO_PERSONAJE && limonY+ALTURA_LIMON>personajeY && limonY<personajeY+ALTURA_PERSONAJE){
     //   alert("ATRAPADO!!");
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarSpan("txtPuntaje",puntaje);
        if(puntaje == 3){
            cambiarVelocidad(150);
        }
        if(puntaje == 6){
            cambiarVelocidad(100);
        }
        if(puntaje == 10){
            clearInterval(intervalo);
            let mensaje=document.getElementById("mensajeGanador");
            mensaje.style.display="block";
        }
    }
}
function detectarPiso(){
    if(limonY+ALTURA_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarSpan("txtVidas",vidas);
        if(vidas==0){
            clearInterval(intervalo);
            alert("PERDISTE")
            reiniciar();// Al quedarse sin vidas, detiene el juego y lo reinicia después de aceptar el mensaje
        }else{
            aparecerLimon();
        }
    }
}
function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ALTURA_LIMON);
    limonY=0;
    actualizarPantalla();
}
//// Detiene el intervalo actual y reinicia las variables del juego a sus valores iniciales
function reiniciar(){
    clearInterval(intervalo);
    puntaje=0;
    vidas=3;
    velocidadCaida=200;
    personajeX=canvas.width/2;
    mostrarSpan("txtPuntaje",puntaje);
    mostrarSpan("txtVidas",vidas);
    let mensaje=document.getElementById("mensajeGanador");
    mensaje.style.display="none";
    iniciar();
    personajeVisible=true;
    pausaJuego=false;
}
//pasua la caida
function pausarJuego(){
    clearInterval(intervalo);
    pausaJuego=true;
}
//reanuda la caida
function continuarJuego(){
    clearInterval(intervalo);
    intervalo=setInterval(bajarLimon,velocidadCaida);
    pausaJuego=false;
}
function desaparecerpersonaje(){
    
    ctx.clearRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
    personajeVisible=false;
}
document.addEventListener("keydown",function(evento){

    if(evento.key=="ArrowLeft"){

        evento.preventDefault();

        moverIzquierda();

    }

    if(evento.key=="ArrowRight"){

        evento.preventDefault();

        moverDerecha();

    }

});