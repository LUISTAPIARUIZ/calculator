let botonIr = document.getElementById("selector-boton__ir");
let botonCalcular = document.getElementById("boton-calcular");
// capturando divs con inputs para hacer calculos
let divVelocidadF =document.getElementById("inputs-velocidad-final");
let divVelocidadI = document.getElementById("inputs-velocidad-inicial");
let divDistancia = document.getElementById("inputs-distancia");
let divAceleracion = document.getElementById("input-aceleracion");
let divTiempo = document.getElementById("input-tiempo");
// fin capturando divs con inputs para hacer calculos

// capturar parrafos que muestran  la und
let undVelocidadF = document.getElementById("input-velocidad-final__und");
let undVelocidadI = document.getElementById("input-velocidad-inicial__und")
let undDistancia = document.getElementById("input-distanacia__und")
let undAceleracion= document.getElementById("input-aceleracion__und")
let undTiempo = document.getElementById("input-tiempo__und")
// fin capturar parrafos que muestran  la und

// capturando inputs con los datos a calcular
let inputVelocidadF = document.getElementById("input-velocidad-final__dato")
let inputVelocidadI = document.getElementById("input-velocidad-inicial__dato");
let inputDistancia = document.getElementById("input-distanacia__dato");
let inputAceleracion = document.getElementById("input-aceleracion__dato");
let inputTiempo = document.getElementById("input-tiempo__dato");
// fin capturando inputs con los datos a calcular

//  capturando parrrafos de resultados
let distanciaDerecha= document.getElementById("derecha__valor");
let resultadoVelocidadI= document.getElementById("resultados__mru__velocidad-inicial");
let resultadoVelocidadF= document.getElementById("resultados__mru__velocidad-final");
let resultadoAceleracion= document.getElementById("resultados__mru__aceleracion");
let resultadoTiempo= document.getElementById("resultados__mru__tiempo");
let resultadoDistancia= document.getElementById("resultados__mru__distancia");
//  fin capturando parrrafos de resultados

let opcionCalculo = document.getElementById("selector__opciones-de-calculo");
let unidadMedida = document.getElementById("selector__und-medida");
let oculto = document.querySelectorAll(".ocultar");
let opcionCalculoGlobal;

botonIr.addEventListener("click", function(){
    undMedida();
    if(opcionCalculo.value == "VelocidadF sin distancia"){
        divVelocidadF.setAttribute("style","display:none");
        divVelocidadI.setAttribute("style","display:flex");
        divDistancia.setAttribute("style","display:none");
        divAceleracion.setAttribute("style","display:flex");
        divTiempo.setAttribute("style","display:flex");
    }
    else if(opcionCalculo.value == "VelocidadF sin tiempo"){
        divVelocidadF.setAttribute("style","display:none");
        divVelocidadI.setAttribute("style","display:flex");
        divDistancia.setAttribute("style","display:flex");
        divAceleracion.setAttribute("style","display:flex");
        divTiempo.setAttribute("style","display:none");
    }
    else if(opcionCalculo.value == "Distancia sin aceleracion"){
        divVelocidadF.setAttribute("style","display:flex");
        divVelocidadI.setAttribute("style","display:flex");
        divDistancia.setAttribute("style","display:none");
        divAceleracion.setAttribute("style","display:none");
        divTiempo.setAttribute("style","display:flex");
    }
    else if(opcionCalculo.value == "Disanacia sin velocidadF"){
        divVelocidadF.setAttribute("style","display:none");
        divVelocidadI.setAttribute("style","display:flex");
        divDistancia.setAttribute("style","display:none");
        divAceleracion.setAttribute("style","display:flex");
        divTiempo.setAttribute("style","display:flex");
    }
    else if(opcionCalculo.value == "Aceleracion"){
        divVelocidadF.setAttribute("style","display:flex");
        divVelocidadI.setAttribute("style","display:flex");
        divDistancia.setAttribute("style","display:none");
        divAceleracion.setAttribute("style","display:none");
        divTiempo.setAttribute("style","display:flex");
    }
    oculto.forEach(el=>{
        el.setAttribute("style","display:flex")
    })
    opcionCalculoGlobal=opcionCalculo.value;

})
botonCalcular.addEventListener("click", function(){
    let resultados=calcularMruv(opcionCalculoGlobal);
    distanciaDerecha.innerText=`${resultados[4]}${undDistancia.innerText}`
    resultadoVelocidadF.innerText=`VelocidadF:${resultados[0]} ${undVelocidadF.innerText}`;
    resultadoVelocidadI.innerText=`VelocidadaI:${resultados[1]}  ${undVelocidadI.innerText}`;
    resultadoAceleracion.innerText=`Aceleracion:${resultados[2]} ${undAceleracion.innerText}`;
    resultadoTiempo.innerText=`Tiempo:${resultados[3]} ${undTiempo.innerText}`;
    resultadoDistancia.innerText=`Distancia:${resultados[4]} ${undDistancia.innerText}`;
    animacion(resultados[3]);
})

const calcularMruv = (opcionCal) =>{
    let velocidadF = parseFloat(inputVelocidadF.value);
    let velocidadI = parseFloat(inputVelocidadI.value);
    let distancia  =parseFloat(inputDistancia.value);
    let aceleracion=parseFloat(inputAceleracion.value);
    let tiempo     =parseFloat(inputTiempo.value);
    let arrayResultado;
    if(opcionCalculoGlobal== "VelocidadF sin distancia"){
        velocidadF= velocidadI + (aceleracion*tiempo);
        distancia= (velocidadI*tiempo) + ((aceleracion*(Math.pow(tiempo,2)))/2);
    }
    else if(opcionCalculoGlobal== "VelocidadF sin tiempo"){
        velocidadF=Math.sqrt(Math.pow(velocidadI,2) +2 * aceleracion * distancia);
        tiempo=(velocidadF-velocidadI)/aceleracion;
    }
    else if(opcionCalculoGlobal== "Distancia sin aceleracion"){
        distancia=((velocidadI+ velocidadF)/2)*tiempo;
        aceleracion=(velocidadF-velocidadI)/tiempo;
    }
    else if(opcionCalculoGlobal== "Disanacia sin velocidadF"){
        distancia= (velocidadI*tiempo) + ((aceleracion*(Math.pow(tiempo,2)))/2);
        velocidadF=velocidadF= velocidadI + (aceleracion*tiempo);
    }
    else if(opcionCalculoGlobal== "Aceleracion"){
        aceleracion=(velocidadF-velocidadI)/tiempo;
        distancia=((velocidadI+ velocidadF)/2)*tiempo;
    }
    arrayResultado=[velocidadF.toFixed(1),velocidadI.toFixed(1),aceleracion.toFixed(1),tiempo.toFixed(1),distancia.toFixed(1)];
    return arrayResultado;
}




const undMedida = ()=>{
    let unidad = unidadMedida.value
    if(unidad == "metros/segundos"){
    undVelocidadF.innerText="m/s"
    undVelocidadI.innerText="m/s"
    undDistancia.innerText="m"
    undAceleracion.innerText="m/s^2"
    undTiempo.innerText="s"
    }
    else if(unidad == "metros/hora"){
    undVelocidadF.innerText="m/h"
    undVelocidadI.innerText="m/h"
    undDistancia.innerText="m"
    undAceleracion.innerText="m/h^2"
    undTiempo.innerText="h"
    }
    else if(unidad == "kilometros/segundos"){
    undVelocidadF.innerText="km/s"
    undVelocidadI.innerText="km/s"
    undDistancia.innerText="km"
    undAceleracion.innerText="km/s^2"
    undTiempo.innerText="s"
    }
    else if(unidad == "kilometros/hora"){
    undVelocidadF.innerText="km/h"
    undVelocidadI.innerText="km/h"
    undDistancia.innerText="km"
    undAceleracion.innerText="km/h^2"
    undTiempo.innerText="h"
    }
}

const animacion = (tiempo)=>{
    botonCalcular.setAttribute("style","display:none");
    let imgCarro= document.getElementById("img__carro");
    imgCarro.setAttribute("style", `transition:${tiempo}s`);
    imgCarro.classList.add("mover-carro")
    setTimeout(function(){
    botonCalcular.setAttribute("style","display:flex");
    imgCarro.setAttribute("style", `transition:0s`);
    imgCarro.classList.remove("mover-carro")
    },tiempo*1000)
}
