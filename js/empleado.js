document.getElementById("formulario").addEventListener("submit", crear);
read();

function crear(e) {
    identificacion = document.getElementById("identificacion").value;
    numero = document.getElementById("numero").value;
    empresa = document.getElementById("empresa").value;
    ciudad = document.getElementById("ciudad").value;
    direccion = document.getElementById("direccion").value;
    correo = document.getElementById("correo").value;
    codigoPostal = document.getElementById("codigoPostal").value;
    regimen = document.getElementById("regimen").value;

  let empleador = {
    identificacion,
    numero,
    empresa,
    ciudad,
    direccion,
    correo,
    codigoPostal,
    regimen
  };

  let copyempleadores = JSON.parse(localStorage.getItem("Empleadores"));

  if (localStorage.getItem("Empleadores") === null) {
    let empleadores = [];
    empleadores.push(empleador);
    localStorage.setItem("Empleadores", JSON.stringify(empleadores));
  } else {

    const copy = copyempleadores.find(i => i.numero === numero); 

        if(copy){
            alert('Empleado existente')
            return
          }
          else{
            let empleadores = JSON.parse(localStorage.getItem("Empleadores"));
            empleadores.push(empleador);
            localStorage.setItem("Empleadores", JSON.stringify(empleadores));
          }
  }

  read();

  document.getElementById("formulario").reset();
  e.preventDefault();
}

function read(){
    let empleadores = JSON.parse(localStorage.getItem("Empleadores"));
    document.getElementById("tbody").innerHTML = "";
    for (let i = 0; i < empleadores.length; i++) {
        let identificacion = empleadores[i].identificacion;
        let numero = empleadores[i].numero;
        let empresa = empleadores[i].empresa;
        let ciudad = empleadores[i].ciudad;
        let direccion = empleadores[i].direccion;
        let correo = empleadores[i].correo;
        let codigoPostal = empleadores[i].codigoPostal;
        let regimen = empleadores[i].regimen;

        document.getElementById("tbody").innerHTML += `
    <tr>
    <td>${identificacion}</td>
    <td>${numero}</td>
    <td>${empresa}</td>
    <td>${ciudad}</td>
    <td>${direccion}</td>
    <td>${correo}</td>
    <td>${codigoPostal}</td>
    <td>${regimen}</td>

    <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" onclick="editar('${numero}')">Edit</button>
    <button class="btn btn-danger" onclick="eliminar('${numero}')">Delete</button></td></tr>`
    }
}

function eliminar(numero){
    let empleadores = JSON.parse(localStorage.getItem("Empleadores"));
    for(let i= 0; i < empleadores.length; i++){
        if(empleadores[i].numero == numero){
            empleadores.splice(i,1);
            alert('Dato eliminado Correctamente')
        }
    } 
    localStorage.setItem("Empleadores", JSON.stringify(empleadores));
    read();
}

function editar(numero){
    let empleadores = JSON.parse(localStorage.getItem("Empleadores"));
    for(let i= 0; i < empleadores.length; i++){
        if(empleadores[i].numero === numero){
            document.getElementById("modalbody").innerHTML = `
            <div class="container" id="body">
                            <form id="formulario">
                            <div class="row justify-content-around mt-6">
                            
                                <div class="form-group col-6">
                                    <label for="">Identificación</label>
                                    <select name="" id="nidentificacion" class="form-control">
                                        <option value="${empleadores[i].identificacion}">${empleadores[i].identificacion}</option>
                                        <option value="CC">cedula de ciudadania</option>
                                        <option value="CE">cedula de extranjeria</option>
                                        <option value="TI">tarjeta de identificacion</option>
                                        <option value="RC">registro civil</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </div>
                
                                <div class="form-group col-6">
                                    <label for="numero">Numero</label>
                                    <input type="text" id="nnumero" required class="form-control" value="${empleadores[i].numero}">
                                </div>
                                <div class="form-group col-6">
                                    <label for="empresa">Empresa</label>
                                    <input type="text" id="nempresa" required class="form-control" value="${empleadores[i].empresa}">
                                </div>
                                <div class="form-group col-6">
                                    <label for="ciudad">Ciudad</label>
                                    <select name="" id="nciudad" class="form-control">
                                        <option value="${empleadores[i].ciudad}">${empleadores[i].ciudad}</option>
                                        <option value="barranquilla">barranquilla</option>
                                        <option value="cali">Cali</option>
                                        <option value="bogota">Bogota</option>
                                        <option value="medellin">Medellin</option>
                                        <option value="medellin">Cartagena</option>
                                    </select>
                                </div>
                                <div class="form-group col-6">
                                    <label for="direccion">Direccion</label>
                                    <input type="text" id="ndireccion" required class="form-control" value="${empleadores[i].direccion}">
                                </div>
                                <div class="form-group col-6">
                                    <label for="correo">Correo</label>
                                    <input type="email" id="ncorreo" required class="form-control" value="${empleadores[i].correo}">
                                </div>
                                <div class="form-group col-6">
                                    <label for="codigoPostal">Codigo postal</label>
                                    <input type="text" id="ncodigoPostal" required class="form-control" value="${empleadores[i].codigoPostal}">
                                </div>
                
                                <div class="form-group col-6">
                                    <label for="regimen">Regimen</label>
                                    <select name="" id="nregimen" class="form-control">
                                        <option value="${empleadores[i].regimen}">${empleadores[i].regimen}</option>
                                        <option value="r.iva">responsable de iva</option>
                                        <option value="p.n.iva">persona natural responsable de iva</option>
                                        <option value="r.especial">regimen especial</option>
                                        <option value="p.n.n.r">persona natural no responsable de iva</option>
                                    </select>
                                </div>
                                <div class="form-group col-7">
                                    <br>
                                    <td><button class="btn btn-success" onclick="actualizar('${i}')">Aceptar</button></td>
                                    <td><button class="btn btn-danger">Cancelar</button></td> 
                                </div>
                            </div>
                        </form>   
                    </div> `
            }
        }
    }

    function actualizar(i){

        let empleadores = JSON.parse(localStorage.getItem("Empleadores"));

        empleadores[i].identificacion = document.getElementById('nidentificacion').value;
        empleadores[i].numero = document.getElementById('nnumero').value;
        empleadores[i].empresa = document.getElementById('nempresa').value;
        empleadores[i].ciudad = document.getElementById('nciudad').value;
        empleadores[i].direccion = document.getElementById('ndireccion').value;
        empleadores[i].correo = document.getElementById('ncorreo').value;
        empleadores[i].codigoPostal = document.getElementById('ncodigoPostal').value;
        empleadores[i].regimen = document.getElementById('nregimen').value;

        localStorage.setItem("Empleadores", JSON.stringify(empleadores));
    }

    function seleccionarId(){
        identificacion = document.getElementById("nidentificacion").value;
    }
