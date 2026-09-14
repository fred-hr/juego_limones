function generarAleatorio(min,max){
    let random=Math.random();
    let numero=random*max;
    let numeroEntero= parseInt(numero);
    numeroEntero = numeroEntero+min;
    return numeroEntero;
}
function mostrarSpan(idSpan,valor){
    let componente=document.getElementById(idSpan);
    componente.textContent=valor;
}
function cambiarVelocidad(nuevaVelocidad){
    velocidadCaida=nuevaVelocidad;
    clearInterval(intervalo);
    intervalo=setInterval(bajarLimon,velocidadCaida);
}