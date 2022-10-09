document
  .getElementById("form_afiliados")
  .addEventListener("submit", crearAfiliado);

function crearAfiliado(e) {
  tipoIdentificacion = document.getElementById("tp_identificacion").value;
  numIdentificacion = document.getElementById("num_identificacion").value;
  paciente = document.getElementById("paciente").value;
  fecha = document.getElementById("fecha_hora").value;
  especialidad = document.getElementById("especialidad").value;

  let afiliado = {
    tipoIdentificacion,
    numIdentificacion,
    paciente,
    fecha,
    especialidad,
  };

  let copyAfiliado = JSON.parse(localStorage.getItem("Afiliados"));

  if (localStorage.getItem("Afiliados") === null) {
    let afiliados = [];
    afiliados.push(afiliado);
    localStorage.setItem("Afiliados", JSON.stringify(afiliados));
  } else {
    const copy = copyAfiliado.find(i => i.numIdentificacion === numIdentificacion || i.fecha === fecha); 

        if(copy){
            alert('Ya existe una cita agendada')
            return
          }
          else{
            let afiliados = JSON.parse(localStorage.getItem("Afiliados"));
            afiliados.push(afiliado);
            localStorage.setItem("Afiliados", JSON.stringify(afiliados));
          }

    
  }

  leerAfiliados();
  document.getElementById("form_afiliados").reset();
  e.preventDefault();

  console.log("Afiliado agregado correctamente");
}

function leerAfiliados() {
  let afiliados = JSON.parse(localStorage.getItem("Afiliados"));
  document.getElementById("tbody").innerHTML = "";
  for (let i = 0; i < afiliados.length; i++) {
    let tipoIdentificacion = afiliados[i].tipoIdentificacion;
    let numIdentificacion = afiliados[i].numIdentificacion;
    let paciente = afiliados[i].paciente;
    let fecha = afiliados[i].fecha;
    let especialidad = afiliados[i].especialidad;
    document.getElementById("tbody").innerHTML += `<tr>
<td>${tipoIdentificacion}</td>
<td>${numIdentificacion}</td>
<td>${paciente}</td>
<td>${fecha}</td>
<td>${especialidad}</td>
<td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" onclick="EditarAfiliados('${numIdentificacion}')">Editar</button>
<button class="btn btn-danger" onclick="eliminarAfiliados('${numIdentificacion}')">Eliminar</button></td>
`;
  }
}
leerAfiliados();

function EditarAfiliados(numIdentificacion) {
  let afiliados = JSON.parse(localStorage.getItem("Afiliados"));
  for (let i = 0; i < afiliados.length; i++) {
    if (afiliados[i].numIdentificacion === numIdentificacion) {
      document.getElementById("modalbody").innerHTML = `
      <div class="container">
      <form id="form_afiliados">
        <div class="container">
          <div class="row justify-content-around mt-1">
            <div class="form-group col-10 mt-2">
              <label for="identificacion">Tipo de identificación:</label>
              <input
              type="text"
              id="ftp_identificacion"
              class="form-control"
              value="${afiliados[i].tipoIdentificacion}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="id">Número de identificación:</label>
              <input
              type="text"
              id="fnum_identificacion"
              class="form-control"
              value="${afiliados[i].numIdentificacion}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="paciente">Paciente:</label>
              <input
              type="text"
              id="fpaciente"
              class="form-control"
              value="${afiliados[i].paciente}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="fecha">Fecha y hora:</label>
              <input
              type="datetime-local"
              class="form-control"
              id="ffecha_hora"
              value="${afiliados[i].fecha}"
              />
            </div>
            <div class="form-group col-10 mt-2">
              <label for="especialidad">Especialidad:</label>
              <input
              type="text" 
              class="form-control" 
              id="fespecialidad" 
              value="${afiliados[i].especialidad}"
              />
            </div>

            <div class="text-center mt-3">
            <a href="afiliados.html"
            ><button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              onclick="actualizarAfiliados('${i}')">
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

function actualizarAfiliados(i) {
  let afiliados = JSON.parse(localStorage.getItem("Afiliados"));
  afiliados[i].tipoIdentificacion =
    document.getElementById("ftp_identificacion").value;
  afiliados[i].numIdentificacion = document.getElementById(
    "fnum_identificacion"
  ).value;
  afiliados[i].paciente = document.getElementById("fpaciente").value;
  afiliados[i].fecha = document.getElementById("ffecha_hora").value;
  afiliados[i].especialidad = document.getElementById("fespecialidad").value;
  localStorage.setItem("Afiliados", JSON.stringify(afiliados));
}

function eliminarAfiliados(numIdentificacion) {
  let afiliados = JSON.parse(localStorage.getItem("Afiliados"));
  for (let i = 0; i < afiliados.length; i++) {
    if (afiliados[i].numIdentificacion == numIdentificacion) {
      afiliados.splice(i, 1);
      alert("Afiliado eliminado correctamente");
    }
  }
  localStorage.setItem("Afiliados", JSON.stringify(afiliados));
  leerAfiliados();
}
