// capturando botones
let botonIr = document.getElementById('selector-boton__ir');
let botonCalcular = document.getElementById('boton-calcular')
// fin capturando botones

// capturando divs para mostrar segun la opcion de calculo
let opcionCalculo = document.getElementById('selector__opciones-de-calculo');
let divVelocidadI = document.getElementById('inputs-velocidad-inicial');
let divAngulo = document.getElementById('inputs-angulo');
let divTiempo = document.getElementById('input-tiempo');
// fin capturando divs para mostrar segun la opcion de calculo

// capturando inputs para hacer calculos
let inputTiempo=document.getElementById('input-tiempo__dato')
let inputVelocidadI=document.getElementById('input-velocidad-inicial__dato')
let inputAngulo=document.getElementById('input-angulo__dato')
// fin capturando inputs para hacer calculos


// capturando text para mostrar resultados
let resultadoVelocidadI=document.getElementById('resultados__mp__velocidad-inicial')
let resultadoAngulo=document.getElementById('resultados__mp__angulo')
let resultadoTiempoVuelo=document.getElementById('resultados__mp__tiempo-vuelo')
let resultadoDistanciaMax=document.getElementById('resultados__mp__distancia-max')
let resultadoAlturaMax=document.getElementById('resultados__mp__alutura-max')
let resultadoTiempoIngrasado=document.getElementById('resultados__mp__tiempo-ingresado')
// fin capturando text para mostrar resultados

// capturando elementos ocultos
let oculto = document.querySelectorAll('.ocultar');
// fin capturando elementos ocultos

// variables  chart.js
let ctx = document.getElementById("myChart").getContext("2d");
let myChart
let  arrayX=[];
let  arrayYRevetido=[];
let  arrayY=[];
let grafico={};
// fin variables  chart.js

// variables auxiliares 
let contadoClickBtnCalcular=0;
// fin variables auxiliares 


// capturando  text para mostrar las unidades de medida
let selectorUndMedida = document.getElementById('selector__und-medida');
let undAngulo = document.getElementById('input-angulo__und');
let undVelicidadI = document.getElementById('input-velocidad-inicial__und');
let undTiempo = document.getElementById('input-tiempo__und');
let undDistancia;
// fin capturando  text para mostrar las unidades de medida

let opcionCalculoGlobal;
// funcion de escucha para mostrar los inputs nescesarios para calular segun la opcion de  calculo
botonIr.addEventListener('click', function() {
    undMedida();
    resultadoTiempoIngrasado.setAttribute("style","display:none")
    divTiempo.setAttribute('style', 'display:none')
    if (opcionCalculo.value == "Posicion en tiempo N"){
        divTiempo.setAttribute('style', 'display:flex')
        resultadoTiempoIngrasado.setAttribute("style","display:flex")
        resultadoTiempoIngrasado.setAttribute
    }
    oculto.forEach(el=> {
        el.setAttribute("style", "display:flex");
    });
    opcionCalculoGlobal=opcionCalculo.value;
})
// fin funcion de escucha para mostrar los inputs nescesarios para calular segun la opcion de  calculo


// funcion de escucha para hacer lo calculos segun lo requerido
botonCalcular.addEventListener('click', function(){
  let arrayReturn=[];
  if (contadoClickBtnCalcular==0){
    arrayReturn= calcularMp(inputVelocidadI.value,inputAngulo.value,inputTiempo.value);
    grafico = graficador(arrayX,arrayY);
    contadoClickBtnCalcular++;
  }else if(contadoClickBtnCalcular>0){
    grafico.destroy();
    arrayReturn= calcularMp(inputVelocidadI.value,inputAngulo.value,inputTiempo.value);
    grafico = graficador(arrayX,arrayY);
  }
  resultadoVelocidadI.innerText=`Velocidad I:${inputVelocidadI.value}${undVelicidadI.innerText}`;
  resultadoAngulo.innerText=`Ángulo:${inputAngulo.value}${undAngulo.innerText}`;
  resultadoTiempoVuelo.innerText=`Tiempo de Vuelo:${arrayReturn[0]}${undTiempo.innerText}`;
  resultadoDistanciaMax.innerText=`Distancia Max:${arrayReturn[1]}${undDistancia}`
  resultadoAlturaMax.innerText=`Altura Max:${arrayReturn[2]}${undDistancia}`
  resultadoTiempoIngrasado.innerText=`Tiempo Ingresado:${arrayReturn[3]}${undTiempo.innerText}`
})
// fin funcion de escucha para hacer lo calculos segun lo requerido

// funcion para calcular y graficar el movimiento parabolico
const calcularMp = (velocidad,angulo,tiempo)=>{
  let arrayReturn;
    if (angulo <= 0  || angulo >= 90){
        alert("El angulo ingresado  tiene que se mayor que 0 ó menor que 90 grados")
    }else if (velocidad <= 0 ){
        alert("La velocidad inicial no puede ser menor o igual que 0")
    }else{
    switch (opcionCalculoGlobal) {
        case "Distancia Max":
          arrayReturn= rellenarArrayCompleto(1,velocidad,angulo,tiempo);
          break;
        case "Atura Max":
          arrayReturn= rellenarArrayCompleto(2,velocidad,angulo,tiempo);
          break;
        case "Posicion en tiempo N":
          arrayReturn= rellenarArrayCompleto(3,velocidad,angulo,tiempo);
          break;
        case "Tiempo de Vuelo":
          arrayReturn= rellenarArrayCompleto(1,velocidad,angulo,tiempo);
          break;
        default:
          break;
      }
    }
  return arrayReturn;
}
// fin funcion para calcular y graficar el movimiento parabolico

// funcion rellena array movimiento  completo
const rellenarArrayCompleto = (opcion,velocidad,angulo,tiempo)=>{
  let anguloRadianes=angulo*(Math.PI / 180)
  let velocidadX= velocidad * (Math.cos(anguloRadianes));
  let velocidadY= velocidad * (Math.sin(anguloRadianes));
  let tiempoVuelo=2*(velocidadY/9.81);
  let tiempoSubidaSegmentado=(tiempoVuelo/2)/50;
  let contadorTiempo;
  let tiempoIngresadoSegmentado=tiempo/50
  let distanciaMax =velocidadX*tiempoVuelo
  let alturaMax=((Math.pow(velocidad,2)*Math.pow((Math.sin(anguloRadianes)),2 )))/(2*9.81);
  switch (opcion) {
    case 1:
      arrayX.splice(0 ,arrayX.length);
      arrayY.splice(0 ,arrayY.length);
      arrayYRevetido.splice(0,arrayYRevetido.length)
      for(let i = 0; i<=100;i++){
        contadorTiempo=i*tiempoSubidaSegmentado
        arrayX.push((velocidadX*contadorTiempo).toFixed(4))
      }
      for(let i = 0; i<=50;i++){
        contadorTiempo=i*tiempoSubidaSegmentado
        arrayY.push((velocidadY*contadorTiempo-(9.81*(Math.pow(contadorTiempo,2)))/2).toFixed(4));
        arrayYRevetido.push((velocidadY*contadorTiempo-(9.81*(Math.pow(contadorTiempo,2)))/2).toFixed(4));
      }
      arrayYRevetido.reverse();
      arrayYRevetido.splice(0, 1);
      arrayY=arrayY.concat(arrayYRevetido);
      break;
    case 2:
      arrayX.splice(0 ,arrayX.length);
      arrayY.splice(0 ,arrayY.length);
      arrayYRevetido.splice(0,arrayYRevetido.length)
      for(let i = 0; i<=100;i++){
        contadorTiempo=i*tiempoSubidaSegmentado
        arrayX.push((velocidadX*contadorTiempo).toFixed(4))
      }
      for(let i = 0; i<=50;i++){
        contadorTiempo=i*tiempoSubidaSegmentado
        arrayY.push((velocidadY*contadorTiempo-(9.81*(Math.pow(contadorTiempo,2)))/2).toFixed(4));
      }
      break;
    case 3:
      arrayX.splice(0 ,arrayX.length);
      arrayY.splice(0 ,arrayY.length);
      for(let i = 0; i<=50;i++){
        contadorTiempo=i*tiempoIngresadoSegmentado
        arrayX.push((velocidadX*contadorTiempo).toFixed(4))
      }
      for(let i = 0; i<=50;i++){
        contadorTiempo=i*tiempoIngresadoSegmentado
        arrayY.push((velocidadY*contadorTiempo-(9.81*(Math.pow(contadorTiempo,2)))/2).toFixed(4));
      }
      break;
    default:
      break;
    
  }
  let arrayReturn=[tiempoVuelo.toFixed(1),distanciaMax.toFixed(1),alturaMax.toFixed(1),tiempo];
  return arrayReturn
}
// fin funcion rellena array movimiento  completo

// funcion encargada de mostrae las und de midida al lado del los inputs
const undMedida = ()=>{
    let unidad= selectorUndMedida.value;
    undAngulo.innerText="°"
        if(unidad == "metros/segundos"){
        undVelicidadI.innerText="m/s";
        undTiempo.innerText="s";
        undDistancia="m"
        }
        else if(unidad == "metros/hora"){
        undVelicidadI.innerText="m/h";
        undTiempo.innerText="h";
        undDistancia="m"
        }
        else if(unidad == "kilometros/segundos"){
        undVelicidadI.innerText="km/s";
        undTiempo.innerText="s";
        undDistancia="km"
        }
        else if(unidad == "kilometros/hora"){
        undVelicidadI.innerText="km/h";
        undTiempo.innerText="h";
        undDistancia="km"
        }
}
// fin funcion encargada de mostrae las und de midida al lado del los inputs

const graficador = (arrrayX,arrrayY)=>{
  myChart= new Chart(ctx,{
    type: "line",
    data:{
        labels:arrrayX,
        datasets:[{
            label:"Altura",
            fill: false,
            cubicInterpolationMode: 'monotone',
            borderColor: 'rgba(0, 0, 255, 0.3)',
            tension: 0.4,
            data:arrrayY
        }]
    },
})
return myChart;
}