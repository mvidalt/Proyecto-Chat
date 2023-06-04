function send() {

  let http = new XMLHttpRequest();
  let mail = document.getElementById("mail").value;
  let pass = document.getElementById("pass").value;

  http.open("GET", "http://localhost:3000/XatLLM/Login?mail=" + mail + "&pass=" + pass, true);


  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE) {
      if (http.status === 200) {
        // Obtener la respuesta del backend
        var response = http.responseText;
        console.log(response);

        if (response == "false") {
          // El login no ha sido correcto
          document.getElementById("resultado").innerHTML = 'Login erroneo';
          alert("login erroneo");
          // Vaciar los campos de entrada
          document.getElementById("mail").value = "";
          document.getElementById("pass").value = "";
        } else {   // El login ha sido exitoso, obtener el código de sesión
          var sessionCode = response;

          // Almacenar el código de sesión en sessionStorage
          sessionStorage.setItem('session', sessionCode);
          sessionStorage.setItem('mail', mail);
          console.log(sessionStorage)


          // Avanzar a la página "Xat"
          window.location.href = 'Xat.html';
        }


      } else {
        // Error en la petición al backend
        console.error('Error en la petición al backend:', http.status);
      }
    }
  };

  http.send();
}