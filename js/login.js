document.getElementById("formulario").addEventListener("submit", verficacion)

function verficacion(){

    usuario = document.getElementById("usuario").value;
    pass = document.getElementById("pass").value;

    const copyUser = JSON.parse(localStorage.getItem("Usuarios"))
  
    const user = copyUser.find(i => i.usuario === usuario && i.pass === pass); 

        if (user) {
            window.location.href ='menu.html'
        }else{
            alert('Usuario o contraseña incorrecto')
            return
      }
}