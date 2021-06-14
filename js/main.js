let bancos = [
  {
      "nombre": "Santander Rio",
      "tasa": 0.37,
      "url": "https://www.santander.com.ar/"
  },
  {
      "nombre": "Banco Galicia",
      "tasa": 0.37,
      "url": "https://www.bancogalicia.com/"
  },
  {
      "nombre": "Banco Nacion",
      "tasa": 0.37,
      "url": "https://www.bna.com.ar/"
  },
  {
    "nombre": "Banco Hipotecario",
    "tasa": 0.38,
    "url": "https://www.hipotecario.com.ar/"
  },
  {
    "nombre": "Banco BBVA",
    "tasa": 0.37,
    "url":"https://www.bbva.com.ar/"
  },
  {
    "nombre": "Banco Supervielle",
    "tasa": 0.37,
    "url":"https://www.supervielle.com.ar/"
  },
  {
    "nombre": "Banco Ciudad",
    "tasa": 0.34,
    "url":"https://www.bancociudad.com.ar/"
  },
];

jQuery(()=>{
  setTimeout(() =>{
    $('#exampleModal').modal('show');
  }, 1500);
});

const ajustarTasa = () =>{
  for (let i = 0; i < bancos.length; i++) {
    bancos[i].tasa += 0.02;
  }
};

const formulaPF = (montoIngresado, plazoIngresado, interes) => {
    let resultado = montoIngresado * ((interes)*(plazoIngresado/365));
    return resultado;
}

let acumuladorPF = ``;
let acumuladorBit = ``;


var montoCorrecto = false;
var plazoCorrecto = false;
const hoy = new Date();
console.log(hoy.toLocaleDateString());

let consultasStorage = localStorage.consultas;
let consultas = [];

if (consultasStorage == null){
  consultas = [];
  $("#btnBorrar").hide();
} else {
  consultas = JSON.parse(consultasStorage);
  consultas.forEach(element => {
    mostrarResultados(element.monto, element.plazo, element.fecha);
    $("#btnBorrar").show();
  });
}

function borrarConsultas(){
  localStorage.clear();
  location.reload();
}

function agregarConsulta(monto){
  consultas.push(monto);
  localStorage.consultas = JSON.stringify(consultas);
}


document.getElementById("monto").addEventListener("input", validarMonto);
document.getElementById("plazo").addEventListener("input", validarPlazo);


$("#realizarConsulta").on('click', function(){
  if(plazoCorrecto && montoCorrecto){
    var montoIngresado = Number(document.getElementById("monto").value);
    var plazoIngresado = Number(document.getElementById("plazo").value);
    var fechaConsulta = hoy.toLocaleDateString();

    if( $('#checkCuenta').is(':checked') ) {
      ajustarTasa();
  }
    agregarConsulta({monto: montoIngresado, plazo: plazoIngresado, fecha: fechaConsulta});
    mostrarResultados(montoIngresado, plazoIngresado, fechaConsulta);
    $("#btnBorrar").show();
  } else {  
    if (plazoCorrecto){
      alert("El monto ingresado es incorrecto");
    } else if (montoCorrecto){
      alert("El plazo ingresado es incorrecto");
    } else {
      alert("Monto y plazo ingresados son incorrectos");
    }
    
  }
})


function validarMonto(event){
  if((event.target.value < 0) && (event.target.value != '')){
    event.target.style.background = 'red';
    montoCorrecto = false;
  }else{
    event.target.style.background = 'white';
    montoCorrecto = true;
  }
}

function validarPlazo(event){
  if((event.target.value < 7) || (event.target.value > 365)){
    event.target.style.background = 'red';
    plazoCorrecto = false;
  }else{
    event.target.style.background = 'white';
    plazoCorrecto = true;
  }
}


function mostrarResultados(monto, plazo, fecha){
    for (let i = 0; i < bancos.length; i++) {
        let interesGenerado = formulaPF(monto, plazo, bancos[i].tasa);
        let resultadoFinal = monto + interesGenerado;
        acumuladorPF += `
         <div class="col-md-6" data-aos="zoom-in" data-aos-delay="100">
         <div class="box">
           <div class="icon"><i class="bi bi-briefcase" style="color: #ff689b;"></i></div>
           <div class="row">
           <div class="col col-lg-8">
           <h3 class="title"><a href="${bancos[i].url}">${bancos[i].nombre}</a></h3>
           <p class="description">Monto inicial: $${monto} </p>
           <p class="description">Tasa de interes: ${bancos[i].tasa.toFixed(2)} </p>
           <p class="description">Fecha: ${fecha} </p>
           </div>
           <div class="col">
           <h4 class="resultado"><a href="">$${resultadoFinal.toFixed(2)}</a></h4>
           </div>
           </div>
           </div>
           
         </div>
       </div>`;
       }
       
       localStorage.setItem("prueba", "Estos es una prueba");
       document.getElementById("resultados").innerHTML = acumuladorPF;
}

let walet = ["argenbtc", "buenbit", "bitex", "ripio", "satoshitango", "sesocio"];

async function traerDatosBitcoin(){

  for (let i = 0; i < walet.length; i++) {
    let url = "https://criptoya.com/api/"+walet[i]+"/btc/ars/0.5"
    await $.get(
      url, 
      function(response, status){
        console.log(response);
        const precioCompra = response.totalAsk;
        const precioVenta = response.totalBid;
  
        acumuladorBit += `<div class="col-md-6" data-aos="zoom-in" data-aos-delay="100">
        <div class="box">
          <div class="icon"><i class="bi bi-briefcase" style="color: #ff689b;"></i></div>
          <div class="row">
          <div class="col col-lg-8">
          <h4 class="title">${walet[i]}</h4>
          </div>
          <p class="description">Precio de compra: ${precioCompra} </p>
          <p class="description">Precio de venta: ${precioVenta} </p>
          </div>
          </div>
          
        </div>
      </div>`;
    })
    
  }
  
  document.getElementById("bitcoins").innerHTML = acumuladorBit;
}




