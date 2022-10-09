document.getElementById("formulario").addEventListener("submit", crear)

function crear(e){
    usuario = document.getElementById("usuario").value;
    pass = document.getElementById("pass").value;

    let user = {
        usuario,
        pass
    };
    
    if (!usuario.trim() || !pass.trim() ) {
        alert('Complete los campos para finalizar el registro')
        return
    }
 
    let copyUser = JSON.parse(localStorage.getItem("Usuarios"))

    if (localStorage.getItem("Usuarios") === null) {
        let usuarios = [];
        usuarios.push(user);
        localStorage.setItem("Usuarios", JSON.stringify(usuarios));
        
    } else {

        const copy = copyUser.find(i => i.usuario === usuario); 

        if(copy){
            alert('Usuario o existente')
            return
          }
          else{
            let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
            usuarios.push(user);
            localStorage.setItem("Usuarios", JSON.stringify(usuarios));
          }
    }
        
    

    document.getElementById("formulario").reset();
    e.preventDefault();

    console.log("Estudiante Guardado Correctamente");
}



