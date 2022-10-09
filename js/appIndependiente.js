document
  .getElementById("form_independiente")
  .addEventListener("submit", crearIndependiente);

function crearIndependiente(e) {
  tipoIdentificacion = document.getElementById("tp_identificacion").value;
  numIdentificacion = document.getElementById("num_identificacion").value;
  nombre = document.getElementById("nombre").value;
  ciudad = document.getElementById("ciudad").value;
  direccion = document.getElementById("direccion").value;
  correo = document.getElementById("correo").value;
  barrio = document.getElementById("barrio").value;
  sede = document.getElementById("sede").value;

  let independiente = {
    tipoIdentificacion,
    numIdentificacion,
    nombre,
    ciudad,
    direccion,
    correo,
    barrio,
    sede
  };

  let copyindependientes = JSON.parse(localStorage.getItem("Independientes"));

  if (localStorage.getItem("Independientes") === null) {
    let independientes = [];
    independientes.push(independiente);
    localStorage.setItem("Independientes", JSON.stringify(independientes));
  } else {

    const copy = copyindependientes.find(i => i.numIdentificacion === numIdentificacion); 

        if(copy){
            alert('independiente existente')
            return
          }
          else{
            let independientes = JSON.parse(localStorage.getItem("Independientes"));
            independientes.push(independiente);
            localStorage.setItem("Independientes", JSON.stringify(independientes));
          }
  }

  leerIndependientes();
  document.getElementById("form_independiente").reset();
  e.preventDefault();

  console.log("Afiliado agregado correctamente");
}

function leerIndependientes() {
  let independientes = JSON.parse(localStorage.getItem("Independientes"));
  document.getElementById("tbody").innerHTML = "";
  for (let i = 0; i < independientes.length; i++) {
    let tipoIdentificacion = independientes[i].tipoIdentificacion;
    let numIdentificacion = independientes[i].numIdentificacion;
    let nombre = independientes[i].nombre;
    let ciudad = independientes[i].ciudad;
    let direccion = independientes[i].direccion;
    let correo = independientes[i].correo;
    let barrio = independientes[i].barrio;
    let sede = independientes[i].sede;
    document.getElementById("tbody").innerHTML += `<tr>
<td>${tipoIdentificacion}</td>
<td>${numIdentificacion}</td>
<td>${nombre}</td>
<td>${ciudad}</td>
<td>${direccion}</td>
<td>${correo}</td>
<td>${barrio}</td>
<td>${sede}</td>
<td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editarIndependientes('${numIdentificacion}')">Editar</button>
<button class="btn btn-danger" onclick="eliminarIndependientes('${numIdentificacion}')">Eliminar</button></td>
`;
  }
}
leerIndependientes();

function editarIndependientes(numIdentificacion) {
  let independientes = JSON.parse(localStorage.getItem("Independientes"));
  for (let i = 0; i < independientes.length; i++) {
    if (independientes[i].numIdentificacion === numIdentificacion) {
      document.getElementById("modalbody").innerHTML = `
      <div class="container">
      <form id="form_independiente">
        <div class="container">
          <div class="row justify-content-around mt-1">
            <div class="form-group col-10 mt-2">
              <label for="identificacion">Tipo de identificación:</label>
              <input
              type="text"
              id="ftp_identificacion"
              class="form-control"
              value="${independientes[i].tipoIdentificacion}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="id">Número de identificación:</label>
              <input
              type="text"
              id="fnum_identificacion"
              class="form-control"
              value="${independientes[i].numIdentificacion}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="nombre">Nombre:</label>
              <input
              type="text"
              id="fnombre"
              class="form-control"
              value="${independientes[i].nombre}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="ciudad">Ciudad:</label>
              <input
              type="text"
              class="form-control"
              id="fciudad"
              value="${independientes[i].ciudad}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="direccion">Dirección:</label>
              <input
              type="text" 
              class="form-control" 
              id="fdireccion" 
              value="${independientes[i].direccion}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="correo">Correo:</label>
              <input
              type="text" 
              class="form-control" 
              id="fcorreo" 
              value="${independientes[i].correo}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="barrio">Barrio:</label>
              <input
              type="text" 
              class="form-control" 
              id="fbarrio" 
              value="${independientes[i].barrio}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="sede">Sede:</label>
              <input
              type="text" 
              class="form-control" 
              id="fsede" 
              value="${independientes[i].sede}"
              />
            </div>

            <div class="text-center mt-3">
            <a href="independiente.html"
            ><button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              onclick="actualizarIndependientes('${i}')">
              Actualizar
            </button></a>
            </div>
          </div>
        </div>
      </form>
    </div>
        `;
    }
  }
}

function actualizarIndependientes(i) {
  let independientes = JSON.parse(localStorage.getItem("Independientes"));
  independientes[i].tipoIdentificacion =
    document.getElementById("ftp_identificacion").value;
    independientes[i].numIdentificacion = document.getElementById(
    "fnum_identificacion"
  ).value;
  independientes[i].nombre = document.getElementById("fnombre").value;
  independientes[i].ciudad = document.getElementById("fciudad").value;
  independientes[i].direccion = document.getElementById("fdireccion").value;
  independientes[i].correo = document.getElementById("fcorreo").value;
  independientes[i].barrio = document.getElementById("fbarrio").value;
  independientes[i].sede = document.getElementById("fsede").value;
  localStorage.setItem("Independientes", JSON.stringify(independientes));
}

function eliminarIndependientes(numIdentificacion) {
  let independientes = JSON.parse(localStorage.getItem("Independientes"));
  for (let i = 0; i < independientes.length; i++) {
    if (independientes[i].numIdentificacion == numIdentificacion) {
        independientes.splice(i, 1);
      alert("Independiente eliminado correctamente");
    }
  }
  localStorage.setItem("Independientes", JSON.stringify(independientes));
  leerIndependientes();
}
