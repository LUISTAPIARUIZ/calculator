// capturando inputs y  boton ir para  validad si se ingresaron datos 
let inputCantDatos= document.getElementById("cant-datos__input");
let inputNombreGrafico = document.getElementById("nombre-grafico__input");
let inputCantidadRadar = document.getElementById("cant-radares__input");
let btnIr=document.getElementById("boton__ir");
let valorRadarGlobal;
let valorCantDatosGlobal;
// capturando los elementos ocultos
let ocultosNombres =document.querySelectorAll(".ocultar-nombres");
let ocultosValores =document.querySelectorAll(".ocultar-valores");
// captuando btn graficar y creando los arrry que se usaran para las graficas
let btnGraficar=document.getElementById("boton-graficar");
let arrayNombres=[];
let arrayDatosRadar=[];
let objetoRadar={};
// capturando div contendero para los datos a graficar
let divContenedorDatos=document.getElementById("datos-valores");
let divContenedorNombres=document.getElementById("datos_nombres");
// creado btn crear nombre
let divBotonCrearNombre=document.createElement("div");
let btnCrearNombres=document.createElement("button");
// vaiables chart.js 
let ctx = document.getElementById("myChart").getContext("2d");
let myChart ;
let objetoChart={};
let contBtnGrafica=0;
// capturando btn desgargar grafico png
let btnDescargarPng =document.getElementById("boton-descargar-png");

// funcion de escucha para el btn ir 
btnIr.addEventListener("click", function(){
    if(inputCantDatos.value.length ===  0 ||
        inputNombreGrafico.value.length === 0 ||
        inputCantidadRadar.value.length === 0){
        alert("Es nescesario que rellene los datos");
    }
    else if(inputCantDatos.value>25 || inputCantidadRadar.value> 25){
        alert("La maxima cantidad de datos a ingresar son 25");
    }
    else if(inputCantDatos.value<1 || inputCantidadRadar.length< 1){
      alert("El 0 y numeros negativos no son comvenientes");
    }
    else{
        // while para limpiar los label y inputs
        // antes de rellenar  nuevamente
        while (divContenedorNombres.firstChild) {
          divContenedorNombres.removeChild(divContenedorNombres.firstChild);
        }
        let titulo=document.createElement("h5");
        titulo.className="datos-nombres__titulo";
        titulo.innerText="Nombres:";
        divContenedorNombres.appendChild(titulo);
        for(let i=0;i<inputCantDatos.value;i++){

            // creando  y agregado loslabels e inputs para el nombre de las columnas
            let divDatoNombre=document.createElement("div");
            let label=document.createElement("label");
            let input=document.createElement("input");
            divDatoNombre.className=`datos-nombre`;
            divDatoNombre.id=`datos_nombre__${i+1}`;
            label.for=`nombre-${i+1}`;
            label.innerText=`Nombre ${i+1}:`;
            input.id=`nombre-${i+1}`;
            divDatoNombre.appendChild(label);
            divDatoNombre.appendChild(input);
            divContenedorNombres.appendChild(divDatoNombre);
           
          }
          
          btnCrearNombres.className="boton-crear-nombres";
          btnCrearNombres.id="boton-crear-nombres";
          btnCrearNombres.innerText="Crear Nombre";
          divBotonCrearNombre.className="datos-nombre__boton-crear-nombres";
          divBotonCrearNombre.appendChild(btnCrearNombres);
          divContenedorNombres.appendChild(divBotonCrearNombre);
          
        ocultosNombres.forEach(el=> {
            el.setAttribute("style", "display:flex");
            el.style.justifyContent = "center";
        });
        valorRadarGlobal=parseInt(inputCantidadRadar.value);
        valorCantDatosGlobal=parseInt(inputCantDatos.value);
    }
})
btnCrearNombres.addEventListener("click", function(){
  let inputNombres=document.querySelectorAll(".datos-nombre input");
  let contadorInputNombres=0;
  arrayNombres.splice(0 ,arrayNombres.length);
  inputNombres.forEach(el=> {
    if(contadorInputNombres === 0){
      if(el.value.length===0){
        alert("Es nescesario completar los nombres");
        contadorInputNombres++;
      }else{
        arrayNombres.push(el.value);
      }
    }else{

    }
  })
  if(arrayNombres.length == valorCantDatosGlobal){
        // while para limpiar los label y inputs
        // antes de rellenar  nuevamente
        while (divContenedorDatos.firstChild) {
          divContenedorDatos.removeChild(divContenedorDatos.firstChild);
        }
    for(let i=0;i<valorRadarGlobal;i++){
      let titulo=document.createElement("h5");
      titulo.className="datos-valores__titulo"
      titulo.innerText=`Radar ${i+1}`
      divContenedorDatos.appendChild(titulo);
      for(let i=0;i<valorCantDatosGlobal;i++){
        let divDato=document.createElement("div");
        let label=document.createElement("label");
        let input=document.createElement("input");
        divDato.className=`datos-valores__${i+1}`
        label.for=`valor-${i+1}`;
        label.innerText=`${arrayNombres[i]}:`
        input.id=`valor-${i+1}`;
        input.type="number"
        divDato.appendChild(label);
        divDato.appendChild(input);
        divContenedorDatos.appendChild(divDato);
      }
    }
    ocultosValores.forEach(el=> {
      el.setAttribute("style", "display:flex");
      el.style.justifyContent = "center";
  });
  }
  
})

btnGraficar.addEventListener("click", function(){
  let  inputsDatos=document.querySelectorAll(".datos-valores input");
  let contadoDatos=0;
  arrayDatosRadar.splice(0 ,arrayDatosRadar.length);
  inputsDatos.forEach(el=>{
    if(el.value.length === 0 && contadoDatos===0){
      alert("Complete los campos de datos")
      contadoDatos++;
    }else{
      arrayDatosRadar.push(el.value)
    }
  })
  if(valorRadarGlobal*valorCantDatosGlobal == arrayDatosRadar.length){
    let dataSet=[];
    let contTitulo=0;
    let objetoDataSet={};
    for(let i=0;i<arrayDatosRadar.length;i=i+valorCantDatosGlobal){
      let colorDinamico=colorAleatorio(1);
      contTitulo++;
      objetoDataSet={};
      objetoDataSet={
        label:`Radar:${contTitulo}`,
        data:arrayDatosRadar.slice(i,i+valorCantDatosGlobal),
        fill:true,
        backgroundColor:colorDinamico[0],
        borderColor:colorDinamico[1],
        pointBackgroundColor:colorDinamico[1],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colorDinamico[0]
      }
      dataSet.push(objetoDataSet);
    }
    if(contBtnGrafica===0){
      objetoChart=graficadora(arrayNombres,dataSet,inputNombreGrafico.value,"radar")
      contBtnGrafica++;
    }else{
      objetoChart.destroy();
      objetoChart=graficadora(arrayNombres,dataSet,inputNombreGrafico.value,"radar")
    }
  }else{
    
  }
  
})
const colorAleatorio = (numero)=>{
    let color=[]
    let colorPrimario;
    let colorSecundario;
    for(let i=0;i<numero;i++){
        colorPrimario=(`rgba(${numeroColorAleatorio()},${numeroColorAleatorio()},${numeroColorAleatorio()},0.5)`);
        color.push(colorPrimario);
        colorSecundario=`${colorPrimario.substr(0,colorPrimario.length - 5)})`  
        color.push(colorSecundario);
    }
    return color;
}
const numeroColorAleatorio = ()=>{
    let numero = (Math.random()*255).toFixed(0)
    return numero
}
const graficadora = (nombres,dataSet,nombreGrafico,tipo)=>{
    myChart = new  Chart(ctx,{
        type:tipo,
        data:{
          labels:nombres,
            datasets:dataSet
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

