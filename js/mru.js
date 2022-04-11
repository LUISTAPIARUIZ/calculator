let botonIr =document.getElementById("selector-boton__ir");
let botonCalcular = document.getElementById("boton-calcular")
let divInputVelocidad = document.getElementById("inputs-velocidad");
let divInputDistancia= document.getElementById("inputs-distancia");
let divInputsTiempo = document.getElementById("input-tiempo");
let undVelocidad = document.getElementById("input-velocidad__und");
let undDistancia = document.getElementById("input-distanacia__und");
let undTiempo = document.getElementById("input-tiempo__und");
let undMediadaGlobal;
let opcionCalculoGlobal;
botonIr.addEventListener("click", function(){
    let opcionCalculo=document.getElementById("selector__opciones-de-calculo");
    let undMediada = document.getElementById("selector__und-medida")
    let oculto=document.querySelectorAll(".ocultar")
    if(opcionCalculo.value == "Velocidad"){
        divInputVelocidad.setAttribute("style","display:none")
        divInputDistancia.setAttribute("style","display:flex")
        divInputsTiempo.setAttribute("style","display:flex")
        opcionCalculoGlobal =opcionCalculo.value;
    }
    else if (opcionCalculo.value == "Distancia"){
        divInputVelocidad.setAttribute("style","display:flex")
        divInputDistancia.setAttribute("style","display:none")
        divInputsTiempo.setAttribute("style","display:flex")
        opcionCalculoGlobal =opcionCalculo.value;
    }
    else if (opcionCalculo.value == "Tiempo"){
        divInputVelocidad.setAttribute("style","display:flex")
        divInputDistancia.setAttribute("style","display:flex")
        divInputsTiempo.setAttribute("style","display:none")
        opcionCalculoGlobal =opcionCalculo.value;
    }

    if (undMediada.value =="metros/segundos"){
        undVelocidad.innerText="m/s"
        undDistancia.innerText ="m"
        undTiempo.innerText="s"
        undMediadaGlobal = undMediada.value;
    }
    else if (undMediada.value =="metros/hora"){
        undVelocidad.innerText="m/h"
        undDistancia.innerText ="m"
        undTiempo.innerText="h"
        undMediadaGlobal = undMediada.value;
    }
    else if (undMediada.value =="kilometros/segundos"){
        undVelocidad.innerText="km/s"
        undDistancia.innerText ="km"
        undTiempo.innerText="s"
        undMediadaGlobal = undMediada.value;
    }
    else if (undMediada.value =="kilometros/hora"){
        undVelocidad.innerText="km/h"
        undDistancia.innerText="km"
        undTiempo.innerText="h"
        undMediadaGlobal = undMediada.value;
    }
    oculto.forEach(el=>{
        el.setAttribute("style", "display:flex");
        el.classList.toggle("deslizar-inputs");
    })
})
botonCalcular.addEventListener("click",function(){
    let inputVelocidad = document.getElementById("input-velocidad__dato");
    let inputDistancia = document.getElementById("input-distanacia__dato");
    let inputTiempo    = document.getElementById("input-tiempo__dato");
    let resultadoVelocidad = document.getElementById("resultados__mru__velocidad");
    let resultadoDistancia =  document.getElementById("resultados__mru__distancia")
    let resultadoTiempo = document.getElementById("resultados__mru__tiempo")
    let resultado;
    let arrayUnidad = undMedida(undMediadaGlobal);
    let imgCarro= document.getElementById("img__carro");
    imgCarro.classList.remove("mover-carro");
    if (opcionCalculoGlobal=="Velocidad"){
        resultado=inputDistancia.value/inputTiempo.value;
        resultadoVelocidad.innerText=`Velocidad:${resultado} ${arrayUnidad[0]}`;
        resultadoDistancia.innerText=`Distancia:${inputDistancia.value} ${arrayUnidad[1]}`;
        resultadoTiempo.innerText=`Tiempo:${inputTiempo.value} ${arrayUnidad[2]}`;
        animacion(inputDistancia.value,inputTiempo.value,arrayUnidad[1]);
    }
    else if(opcionCalculoGlobal=="Distancia"){
        resultado=inputVelocidad.value*inputTiempo.value;
        resultadoVelocidad.innerText=`Velocidad:${inputVelocidad.value} ${arrayUnidad[0]}`;
        resultadoDistancia.innerText=`Distancia:${resultado} ${arrayUnidad[1]}`;
        resultadoTiempo.innerText=`Tiempo:${inputTiempo.value} ${arrayUnidad[2]}`;
        animacion(resultado,inputTiempo.value,arrayUnidad[1]);
    }
    else if (opcionCalculoGlobal=="Tiempo"){
        resultado=inputDistancia.value/inputVelocidad.value;
        resultadoVelocidad.innerText=`Velocidad:${inputVelocidad.value} ${arrayUnidad[0]}`;
        resultadoDistancia.innerText=`Distancia:${inputDistancia.value} ${arrayUnidad[1]}`;
        resultadoTiempo.innerText=`Tiempo:${resultado} ${arrayUnidad[2]}`;
        animacion(inputDistancia.value,resultado,arrayUnidad[1]);
    }

})

const undMedida = (unidad)=>{
    let unidades;
    if(unidad == "metros/segundos"){
        unidades = ["m/s","m","s"]
    }
    else if(unidad == "metros/hora"){
        unidades = ["m/h","m","h"]
    }
    else if(unidad == "kilometros/segundos"){
        unidades = ["km/s","km","s"]
    }
    else if(unidad == "kilometros/hora"){
        unidades = ["km/h","km","h"]
    }
    return unidades;
}

const animacion = (distancia,tiempo,undMedida)=>{
    botonCalcular.setAttribute("style","display:none");
    let imgCarro= document.getElementById("img__carro");
    let distanciaFinal = document.getElementById("derecha__valor")
    distanciaFinal.innerText=`${distancia}${undMedida}`;
    imgCarro.setAttribute("style", `transition:${tiempo}s`);
    imgCarro.classList.add("mover-carro")
    setTimeout(function(){
    botonCalcular.setAttribute("style","display:flex");
    imgCarro.setAttribute("style", `transition:0s`);
    imgCarro.classList.remove("mover-carro")
    },tiempo*1000)
}