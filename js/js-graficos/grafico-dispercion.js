// capturando inputs y  boton ir para  validad si se ingresaron datos 
let inputCantDatos= document.getElementById("cant-datos__input");
let inputNombreGrafico = document.getElementById("nombre-grafico__input");
let btnIr=document.getElementById("boton__ir");
// capturando los elementos ocultos
let ocultos =document.querySelectorAll(".ocultar");
// captuando btn graficar y creando los arrry que se usaran para las graficas
let btnGraficar=document.getElementById("boton-graficar");
let arrayvaloresX=[];
let arrayValoresY=[];
let arrayPosiciones=[];
let objetoPosiciones={};
// capturando div contendero para los datos a graficar
let divContenedorDatos=document.getElementById("contenedor__datos-ingresados")
// vaiables chart.js 
let ctx = document.getElementById("myChart").getContext("2d");
let myChart ;
let contadorBtnGraficar=0;
let objetoChart={};
// capturando btn desgargar grafico png
let btnDescargarPng =document.getElementById("boton-descargar-png");

// funcion de escucha para el btn ir 
btnIr.addEventListener("click", function(){
    if(inputCantDatos.value.length ===  0 || inputNombreGrafico.value.length === 0){
        alert("Es nescesario que rellene los datos");
    }
    else if(inputCantDatos.value>25){
        alert("La maxima cantidad de datos a ingresar son 25")
    }
    else{
        // while para limpiar los label y inputs
        // antes de rellenar  nuevamente
        while (divContenedorDatos.firstChild) {
            divContenedorDatos.removeChild(divContenedorDatos.firstChild);
        }
        for(let i=0;i<inputCantDatos.value;i++){
            // creando  y agregado loslabels e inputs para el nombre de las columnas
            let datosPosicion= document.createElement("div");
            let titulo =document.createElement("h5");
            let divPosicionX=document.createElement("div");
            let divPosicionY=document.createElement("div");
            let labelY=document.createElement("label");
            let labelX=document.createElement("label");
            let inputY = document.createElement("input");
            let inputX = document.createElement("input");
            datosPosicion.className = "datos__posicion";
            titulo.className="datos__posicion__titulo";
            titulo.innerText= `Dato ${i+1}`;
            divPosicionX.className ="posicion-x";
            divPosicionY.className ="posicion-y";
            labelX.for = `input__posicion-x-${i+1}`;
            labelY.for = `input__posicion-y-${i+1}`;
            labelY.innerText="Posicion en Y:"
            labelX.innerText="Posicion en X:"
            inputX.id=`input__posicion-x-${i+1}`;
            inputY.id=`input__posicion-y-${i+1}`
            divPosicionX.appendChild(labelX);
            divPosicionX.appendChild(inputX);
            divPosicionY.appendChild(labelY);
            divPosicionY.appendChild(inputY);
            datosPosicion.appendChild(titulo);
            datosPosicion.appendChild(divPosicionX);
            datosPosicion.appendChild(divPosicionY);
            divContenedorDatos.appendChild(datosPosicion);
        }
        ocultos.forEach(el=> {
            el.setAttribute("style", "display:flex");
        });
    }
})
btnGraficar.addEventListener("click", function(){
    let contadorAlertX=0;
    let contadorAlertY=0;
    let valoresX = document.querySelectorAll(".posicion-x input");
    let valoresY = document.querySelectorAll(".posicion-y input");

    arrayvaloresX.splice(0 ,valoresX.length);
    arrayValoresY.splice(0 ,valoresY.length);
    arrayPosiciones.splice(0 ,arrayPosiciones.length);
    // recorriendo las columas y creando arrays
    valoresX.forEach(e=>{

        if(e.value.length === 0){
            if(contadorAlertX=== 0){
                alert("Estan faltando datos de posicion X");
                contadorAlertX++
            }else{
            }
            
        }else{
            arrayvaloresX.push(e.value);
        }
    })
    valoresY.forEach(e=>{
        if(e.value.length === 0){
            if(contadorAlertY=== 0){
                alert("Estan faltando datos de posicion Y");
                contadorAlertY++
            }else{

            }
        }else{
            arrayValoresY.push(e.value);
        }
    })
    for(let i=0;i<arrayValoresY.length;i++){
        objetoPosiciones= {x:arrayvaloresX[i],y:arrayValoresY[i]};
        arrayPosiciones.push(objetoPosiciones)
    }
    console.log(arrayPosiciones);
    

    if(contadorBtnGraficar===0){
        objetoChart=graficadora(arrayPosiciones,inputNombreGrafico.value,"scatter")
        contadorBtnGraficar++;
    }else{
        objetoChart.destroy();
        objetoChart=graficadora(arrayPosiciones,inputNombreGrafico.value,"scatter")
    }

})
const colorAleatorio = (numero)=>{
    let color=[]
    for(let i=0;i<numero;i++){
        color.push(`rgba(${numeroColorAleatorio()},${numeroColorAleatorio()},${numeroColorAleatorio()},0.5)`);
    }
    return color;
}
const numeroColorAleatorio = ()=>{
    let numero = (Math.random()*255).toFixed(0)
    return numero
}
const graficadora = (posiciones,nombreGrafico,tipo)=>{
    myChart = new  Chart(ctx,{
        type:tipo,
        data:{
            datasets:[{
                label:"MI grafico",
                data:posiciones,
                backgroundColor:
                    colorAleatorio(1),
                borderColor:colorAleatorio(1)[0],
                pointRadius: 5
            }]
        },
        
    })
    btnDescargarPng.onclick = function(){
        let a =document.createElement("a");
        a.href = myChart.toBase64Image();
        a.download=`${nombreGrafico}.png`;
        a.click();
    }
    return myChart;
}

