// capturando inputs y  boton ir para  validad si se ingresaron datos 
let inputCantDatos= document.getElementById("cant-datos__input");
let inputNombreGrafico = document.getElementById("nombre-grafico__input");
let btnIr=document.getElementById("boton__ir");
// capturando los elementos ocultos
let ocultos =document.querySelectorAll(".ocultar");
let ocultosDivDatos=document.querySelectorAll(".ocultar-div-datos");
// capturando div para ingresar los datos de la graficador
let divNombreColumnas = document.getElementById("datos-ingresados__nombre-columnas");
let divValorColumnas = document.getElementById("datos-ingresados__valor-columnas");
// captuando btn graficar y creando los arrry que se usaran para las graficas
let btnGraficar=document.getElementById("boton-graficar");
let arrayNombreColumna=[];
let arraryValorColumna=[];
// vaiables chart.js 
let ctx = document.getElementById("myChart").getContext("2d");
let myChart ;
let contadorBtnGraficar=0;
let objetoChart={};
// capturando btn desgargar grafico png
let btnDescargarPng =document.getElementById("boton-descargar-png");
// capturando checkbox para validar segun el tipo de grafico 
let checkCirculo =document.getElementById("tipo-grafico-circulo__input");
let checkAnillo = document.getElementById("tipo-grafico-anillo__input")
let tipoGrafico;
// funcion escucha checkbox circular
checkCirculo.addEventListener("click", function(){
    checkAnillo.checked = false;
})
// funcion escucha checkbox anillo 
checkAnillo.addEventListener("click", function(){
    checkCirculo.checked=false;
})

// funcion de escucha para el btn ir 
btnIr.addEventListener("click", function(){
    if(inputCantDatos.value.length ===  0 || inputNombreGrafico.value.length === 0){
        alert("Es nescesario que rellene los datos");
    }
    else if(inputCantDatos.value>25){
        alert("La maxima cantidad de datos a ingresar son 25")
    }
    else if (checkCirculo.checked === false && checkAnillo.checked === false){
        alert("seleccione alguno de los dos tipos de graficos")
    }
    else{
        // while para limpiar los label y inputs
        // antes de rellenar  nuevamente
        while (divNombreColumnas.firstChild) {
            divNombreColumnas.removeChild(divNombreColumnas.firstChild);
            divValorColumnas.removeChild(divValorColumnas.firstChild);
        }
        for(let i=0;i<inputCantDatos.value;i++){
            let brNombre=document.createElement("br");
            let brValor=document.createElement("br");
            // creando  y agregado loslabels e inputs para el nombre de las columnas
            let labelNombreColumna= document.createElement("label");
            let inputNombreColumna= document.createElement("input");
            labelNombreColumna.setAttribute("for",`nombre-columnas__input-${i+1}`);
            labelNombreColumna.innerText=`Nombre de la columna ${i+1} :`;
            inputNombreColumna.setAttribute("class","nombre-columnas__input");
            inputNombreColumna.setAttribute("id",`nombre-columnas__input-${i+1}`);
            divNombreColumnas.appendChild(labelNombreColumna);
            divNombreColumnas.appendChild(inputNombreColumna);
            divNombreColumnas.appendChild(brNombre);
            // creando  y agregado loslabels e inputs para el valor de las columnas
            let labelValorColumna= document.createElement("label");
            let inputValorColumna= document.createElement("input");
            labelValorColumna.setAttribute("for",`valor-columnas__input-${i+1}`);
            labelValorColumna.innerText=`Valor de la columna ${i+1} :`;
            inputValorColumna.setAttribute("class","valor-columnas__input");
            inputValorColumna.setAttribute("id",`valor-columnas__input-${i+1}`);
            divValorColumnas.appendChild(labelValorColumna);
            divValorColumnas.appendChild(inputValorColumna);
            divValorColumnas.appendChild(brValor);

        }
        ocultos.forEach(el=> {
            el.setAttribute("style", "display:flex");
        });
        ocultosDivDatos.forEach(el=>{
            el.setAttribute("style", "display:block");
        })
        if(checkCirculo.checked === true){
            tipoGrafico= "pie"
        }else if(checkAnillo.checked=== true){
            tipoGrafico= "doughnut"
        }
    }
})
btnGraficar.addEventListener("click", function(){
    let contadorAlertNombres=0;
    let contadorAlertValores=0;
    let nombresColumnas = document.querySelectorAll(".nombre-columnas__input");
    let valoresColumnas = document.querySelectorAll(".valor-columnas__input");

    arrayNombreColumna.splice(0 ,arrayNombreColumna.length);
    arraryValorColumna.splice(0 ,arraryValorColumna.length);
    // recorriendo las columas y creando arrays
    nombresColumnas.forEach(e=>{

        if(e.value.length === 0){
            if(contadorAlertNombres=== 0){
                alert("Estan faltando nombres en la columa datos");
                contadorAlertNombres++
            }else{

            }
            
        }else{
            arrayNombreColumna.push(e.value);
        }
    })
    valoresColumnas.forEach(e=>{
        if(e.value.length === 0){
            if(contadorAlertValores=== 0){
                alert("Estan faltando valores en la columa datos");
                contadorAlertValores++
            }else{

            }
        }else{
            arraryValorColumna.push(e.value);
        }
    })
    if(contadorBtnGraficar===0){
        objetoChart=graficadora(arrayNombreColumna,arraryValorColumna,inputNombreGrafico.value,arrayNombreColumna.length,tipoGrafico)
        contadorBtnGraficar++;
    }else{
        objetoChart.destroy();
        objetoChart=graficadora(arrayNombreColumna,arraryValorColumna,inputNombreGrafico.value,arrayNombreColumna.length,tipoGrafico)
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
const graficadora = (nombres,valores,nombreGrafico,cantidadDatos,tipo)=>{
    myChart = new  Chart(ctx,{
        type:tipo,
        data:{
            labels:nombres,
            datasets:[{
                label:"MI grafico",
                data:valores,
                backgroundColor:
                    colorAleatorio(cantidadDatos)
            }]
        }
    })
    btnDescargarPng.onclick = function(){
        let a =document.createElement("a");
        a.href = myChart.toBase64Image();
        a.download=`${nombreGrafico}.png`;
        a.click();
    }
    return myChart;
}