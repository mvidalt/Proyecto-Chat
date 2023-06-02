function añadiramigos() {
    var mail = sessionStorage.getItem('mail');
    var session = sessionStorage.getItem('session');
    var friend = document.getElementById("friend").value;

    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/XatLLM/Friend", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    http.onreadystatechange = function () {
      if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
          // Obtener la respuesta del backend
          var response = http.responseText;
            if (response == '0') {
                document.getElementById("resultado").innerHTML = 'El servidor no responde';
            } else if (response == '1') {
                document.getElementById("resultado").innerHTML = 'Amigo agregado correctamente';
            } else if (response == '2') {
                document.getElementById("resultado").innerHTML = 'Amigo no encontrado';
            } else if (response == '3') {
                document.getElementById("resultado").innerHTML = 'El código de sesión ha expirado y se requiere iniciar sesión nuevamente';
            }
          }
        } else {
          // Error en la petición al backend
          console.error('Error en la petición al backend:', http.status);
        }
      
    };
  
    var params = "mail=" + encodeURIComponent(mail) + "&session=" + encodeURIComponent(session) + "&friend=" + encodeURIComponent(friend);
  
    http.send(params);
}

function recibiramigos(){

}