
let botonesCalculadora = document.querySelectorAll('.txt-teclado')
let contadorOperaciones=0;
botonesCalculadora.forEach(el=>{
    el.addEventListener("click", function(ev){
        let pantallaOperaciones = document.getElementById('pantalla-operaciones')
        let preConcatenacion = pantallaOperaciones.innerText;
        if(el.innerHTML == "="){
            if(preConcatenacion !== "" && eval(pantallaOperaciones.innerText) !== undefined){

                let divResulado=document.createElement("div");
                divResulado.setAttribute("class",`pantalla resultado${contadorOperaciones++}`)
                pantallaOperaciones.insertAdjacentElement('afterend',divResulado);
                divResulado.innerText="Resultado : "+eval(pantallaOperaciones.innerText);
                pantallaOperaciones.innerText="";
            }else{
                let divResulado=document.createElement("div");
                divResulado.setAttribute("class",`pantalla resultado${contadorOperaciones++}`)
                pantallaOperaciones.insertAdjacentElement('afterend',divResulado);
                divResulado.innerText="Resultado : Vacio";
                pantallaOperaciones.innerText="";
            }
        }
        else if( el.innerHTML == "CE" || el.innerHTML == "ce"){
            pantallaOperaciones.innerText= preConcatenacion.substring(0,(preConcatenacion.length)-1);
        }else{

            pantallaOperaciones.innerText=preConcatenacion.concat(el.innerText);
        }
    })
})